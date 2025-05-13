import React from "react";
import { render, screen } from "@testing-library/react";

import ActivitiesPage from "../ActivitiesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders activities page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ActivitiesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("activities-datatable")).toBeInTheDocument();
    expect(screen.getByRole("activities-add-button")).toBeInTheDocument();
});
