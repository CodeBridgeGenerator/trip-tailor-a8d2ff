import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef, useEffect} from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";

const ItinerariesDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user,   selectedDelete,
  setSelectedDelete, onCreateResult}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);

const dropdownTemplate0 = (rowData, { rowIndex }) => <p >{rowData.userID?.name}</p>
const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.title}</p>
const p_calendarTemplate2 = (rowData, { rowIndex }) => <p >{rowData.startDate}</p>
const p_calendarTemplate3 = (rowData, { rowIndex }) => <p >{rowData.endDate}</p>
const p_numberTemplate4 = (rowData, { rowIndex }) => <p >{rowData.groupSize}</p>
const currencyTemplate5 = (rowData, { rowIndex }) => <InputNumber value={rowData.totalBudget}  mode="currency" currency="MYR" locale="en-US" disabled={true} useGrouping={false} />
const dropdownArrayTemplate6 = (rowData, { rowIndex }) => <p >{rowData.pacing}</p>
const dropdownArrayTemplate7 = (rowData, { rowIndex }) => <p >{rowData.interest}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
      const checkboxTemplate = (rowData) => (
    <Checkbox
      checked={selectedItems.some((item) => item._id === rowData._id)}
      onChange={(e) => {
        let _selectedItems = [...selectedItems];

        if (e.checked) {
          _selectedItems.push(rowData);
        } else {
          _selectedItems = _selectedItems.filter(
            (item) => item._id !== rowData._id,
          );
        }
        setSelectedItems(_selectedItems);
      }}
    />
  );
  const deselectAllRows = () => {
    // Logic to deselect all selected rows
    setSelectedItems([]); // Assuming setSelectedItems is used to manage selected items state
  };

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;

    try {
      const promises = selectedItems.map((item) =>
        client.service("companies").remove(item._id),
      );
      await Promise.all(promises);
      const updatedData = data.filter(
        (item) => !selectedItems.find((selected) => selected._id === item._id),
      );
      setData(updatedData);
      setSelectedDelete(selectedItems.map((item) => item._id));

      deselectAllRows();
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };
    
  const handleMessage = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleHideDialog = () => {
    setShowDialog(false); // Close the dialog
  };

    return (
        <>
        <DataTable 
           value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        onCreateResult={onCreateResult}
        >
                <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          body={checkboxTemplate}
        />
<Column field="userID" header="User's Name" body={dropdownTemplate0} filter={selectedFilterFields.includes("userID")} hidden={selectedHideFields?.includes("userID")}  style={{ minWidth: "8rem" }} />
<Column field="title" header="Title" body={pTemplate1} filter={selectedFilterFields.includes("title")} hidden={selectedHideFields?.includes("title")}  sortable style={{ minWidth: "8rem" }} />
<Column field="startDate" header="Start Date" body={p_calendarTemplate2} filter={selectedFilterFields.includes("startDate")} hidden={selectedHideFields?.includes("startDate")}  sortable style={{ minWidth: "8rem" }} />
<Column field="endDate" header="End Date" body={p_calendarTemplate3} filter={selectedFilterFields.includes("endDate")} hidden={selectedHideFields?.includes("endDate")}  sortable style={{ minWidth: "8rem" }} />
<Column field="groupSize" header="GroupSize" body={p_numberTemplate4} filter={selectedFilterFields.includes("groupSize")} hidden={selectedHideFields?.includes("groupSize")}  sortable style={{ minWidth: "8rem" }} />
<Column field="totalBudget" header="Total Budget" body={currencyTemplate5} filter={selectedFilterFields.includes("totalBudget")} hidden={selectedHideFields?.includes("totalBudget")}  sortable style={{ minWidth: "8rem" }} />
<Column field="pacing" header="Pacing" body={dropdownArrayTemplate6} filter={selectedFilterFields.includes("pacing")} hidden={selectedHideFields?.includes("pacing")}  style={{ minWidth: "8rem" }} />
<Column field="interest" header="Interest" body={dropdownArrayTemplate7} filter={selectedFilterFields.includes("interest")} hidden={selectedHideFields?.includes("interest")}  style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>


      {selectedItems.length > 0 ? (
        <div
          className="card center"
          style={{
            width: "51rem",
            margin: "20px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "#2A4454",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2A4454",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {selectedItems.length} selected
            <span
              className="pi pi-times"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                color: "#2A4454",
              }}
              onClick={() => {
                deselectAllRows();
              }}
            />
          </div>

          {/* New buttons section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Copy button */}
            <Button
              label="Copy"
              labelposition="right"
              icon={
                <img
                  src={CopyIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Copy"
              // onClick={handleCopy}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Duplicate button */}
            <Button
              label="Duplicate"
              labelposition="right"
              icon={
                <img
                  src={DuplicateIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Duplicate"
              // onClick={handleDuplicate}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Export button */}
            <Button
              label="Export"
              labelposition="right"
              icon={
                <img
                  src={ExportIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Export"
              // onClick={handleExport}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Message button */}
            <Button
              label="Message"
              labelposition="right"
              icon={
                <img
                  src={InviteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleMessage}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* InboxCreateDialogComponent */}
            <InboxCreateDialogComponent
              show={showDialog}
              onHide={handleHideDialog}
              serviceInbox="companies"
              onCreateResult={onCreateResult}
              // selectedItemsId={selectedItems.map(item => item._id)}
              selectedItemsId={selectedItems}
            />

            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <Button
              label="Delete"
              labelposition="right"
              icon={
                <img
                  src={DeleteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleDelete}
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                gap: "4px",
              }}
            />
          </div>
        </div>
      ) : null}


        <Dialog header="Upload Itineraries Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="itineraries"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search Itineraries" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
    <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false)
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default ItinerariesDataTable;