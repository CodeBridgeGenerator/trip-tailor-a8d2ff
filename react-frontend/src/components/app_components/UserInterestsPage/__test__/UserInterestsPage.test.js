import React from "react";
import { render, screen } from "@testing-library/react";

import UserInterestsPage from "../UserInterestsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders userInterests page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserInterestsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("userInterests-datatable")).toBeInTheDocument();
    expect(screen.getByRole("userInterests-add-button")).toBeInTheDocument();
});
