import React from "react";
import { render, screen } from "@testing-library/react";

import InterestsPage from "../InterestsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders interests page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InterestsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("interests-datatable")).toBeInTheDocument();
    expect(screen.getByRole("interests-add-button")).toBeInTheDocument();
});
