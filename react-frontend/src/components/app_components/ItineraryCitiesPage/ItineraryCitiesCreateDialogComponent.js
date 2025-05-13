import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const ItineraryCitiesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [itineraryID, setItineraryID] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [itineraryID], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.cityName)) {
                error["cityName"] = `City Name field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.country)) {
                error["country"] = `Country field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.latlong)) {
                error["latlong"] = `Latlong field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            itineraryID: _entity?.itineraryID?._id,cityName: _entity?.cityName,country: _entity?.country,latlong: _entity?.latlong,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("itineraryCities").create(_data);
        const eagerResult = await client
            .service("itineraryCities")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "itineraryID",
                    service : "itineraries",
                    select:["title"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info ItineraryCities updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in ItineraryCities" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount itineraries
                    client
                        .service("itineraries")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleItinerariesId } })
                        .then((res) => {
                            setItineraryID(res.data.map((e) => { return { name: e['title'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Itineraries", type: "error", message: error.message || "Failed get itineraries" });
                        });
                }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const itineraryIDOptions = itineraryID.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create ItineraryCities" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="itineraryCities-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="itineraryID">Title:</label>
                <Dropdown id="itineraryID" value={_entity?.itineraryID?._id} optionLabel="name" optionValue="value" options={itineraryIDOptions} onChange={(e) => setValByKey("itineraryID", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["itineraryID"]) ? (
              <p className="m-0" key="error-itineraryID">
                {error["itineraryID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="cityName">City Name:</label>
                <InputText id="cityName" className="w-full mb-3 p-inputtext-sm" value={_entity?.cityName} onChange={(e) => setValByKey("cityName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["cityName"]) ? (
              <p className="m-0" key="error-cityName">
                {error["cityName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="country">Country:</label>
                <InputText id="country" className="w-full mb-3 p-inputtext-sm" value={_entity?.country} onChange={(e) => setValByKey("country", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["country"]) ? (
              <p className="m-0" key="error-country">
                {error["country"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="latlong">Latlong:</label>
                <InputText id="latlong" className="w-full mb-3 p-inputtext-sm" value={_entity?.latlong} onChange={(e) => setValByKey("latlong", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["latlong"]) ? (
              <p className="m-0" key="error-latlong">
                {error["latlong"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ItineraryCitiesCreateDialogComponent);
