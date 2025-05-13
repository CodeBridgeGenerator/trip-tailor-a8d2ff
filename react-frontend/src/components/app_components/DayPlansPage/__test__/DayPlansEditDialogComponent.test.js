import React from "react";
import { render, screen } from "@testing-library/react";

import DayPlansEditDialogComponent from "../DayPlansEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders dayPlans edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DayPlansEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("dayPlans-edit-dialog-component")).toBeInTheDocument();
});
