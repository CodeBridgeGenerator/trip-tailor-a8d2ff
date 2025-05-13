import React from "react";
import { render, screen } from "@testing-library/react";

import BookmarksPage from "../BookmarksPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders bookmarks page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <BookmarksPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("bookmarks-datatable")).toBeInTheDocument();
    expect(screen.getByRole("bookmarks-add-button")).toBeInTheDocument();
});
