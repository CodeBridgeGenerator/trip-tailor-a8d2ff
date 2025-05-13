import React from "react";
import { render, screen } from "@testing-library/react";

import ItinerariesPage from "../ItinerariesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders itineraries page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ItinerariesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("itineraries-datatable")).toBeInTheDocument();
    expect(screen.getByRole("itineraries-add-button")).toBeInTheDocument();
});
