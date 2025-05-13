import React from "react";
import { render, screen } from "@testing-library/react";

import DayPlansPage from "../DayPlansPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders dayPlans page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DayPlansPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("dayPlans-datatable")).toBeInTheDocument();
    expect(screen.getByRole("dayPlans-add-button")).toBeInTheDocument();
});
