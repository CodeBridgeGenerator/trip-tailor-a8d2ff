import React from "react";
import { render, screen } from "@testing-library/react";

import ReceiptsPage from "../ReceiptsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders receipts page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ReceiptsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("receipts-datatable")).toBeInTheDocument();
    expect(screen.getByRole("receipts-add-button")).toBeInTheDocument();
});
