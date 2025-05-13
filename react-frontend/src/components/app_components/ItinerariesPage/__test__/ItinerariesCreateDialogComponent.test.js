import React from "react";
import { render, screen } from "@testing-library/react";

import ItinerariesCreateDialogComponent from "../ItinerariesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders itineraries create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ItinerariesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("itineraries-create-dialog-component")).toBeInTheDocument();
});
