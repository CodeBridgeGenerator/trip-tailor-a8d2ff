import React from "react";
import { render, screen } from "@testing-library/react";

import ActivitiesEditDialogComponent from "../ActivitiesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders activities edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ActivitiesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("activities-edit-dialog-component")).toBeInTheDocument();
});
