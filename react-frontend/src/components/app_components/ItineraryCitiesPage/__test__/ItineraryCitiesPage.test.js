import React from "react";
import { render, screen } from "@testing-library/react";

import ItineraryCitiesPage from "../ItineraryCitiesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders itineraryCities page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ItineraryCitiesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("itineraryCities-datatable")).toBeInTheDocument();
    expect(screen.getByRole("itineraryCities-add-button")).toBeInTheDocument();
});
