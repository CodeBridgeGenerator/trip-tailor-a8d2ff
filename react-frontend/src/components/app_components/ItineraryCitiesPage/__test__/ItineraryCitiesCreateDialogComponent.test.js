import React from "react";
import { render, screen } from "@testing-library/react";

import ItineraryCitiesCreateDialogComponent from "../ItineraryCitiesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders itineraryCities create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ItineraryCitiesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("itineraryCities-create-dialog-component")).toBeInTheDocument();
});
