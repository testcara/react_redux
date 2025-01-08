import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../login";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { loginUser, registerUser } from "../../redux/thunks/authThunk";
import { Dispatch } from "react";
import {
  AuthActionTypes,
  loginSuccess,
  loginFailure,
  registerFailure,
  registerSuccess,
} from "../../redux/actions/authActions";
import RegisterPage from "../register";

jest.mock("../../redux/thunks/authThunk", () => ({
  loginUser: jest.fn(),
  registerUser: jest.fn()
}));

describe("LoginPage", () => {
  beforeEach(() => {
    // Clear previous mocks before each test
    jest.clearAllMocks();
  });
  it("should render the login form", () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("should dispatch loginSuccess when login is successful", async () => {
    // Mock the thunk's behavior
    (loginUser as jest.Mock).mockImplementation((username: string) => {
      return (dispatch: Dispatch<AuthActionTypes>) => {
        dispatch(loginSuccess(username)); // Mock dispatching success
        // return Promise.resolve(true); // Simulate successful login
      };
    });

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button"));

    // Wait for the state change to occur (async action)
    await waitFor(() => {
      console.log(`hi, ${JSON.stringify(store.getState())}`);
      expect(store.getState().auth.user).toBe("testuser");
    });
    await waitFor(() => {
      console.log(`hi, ${JSON.stringify(store.getState())}`);
      expect(store.getState().auth.error).toBeNull();
    });
    // Ensure that loginUser was called with correct arguments
    expect(loginUser).toHaveBeenCalledWith("testuser", "password");
  });

  it("should dispatch loginFailure when login fails", async () => {
    // Mock the thunk's behavior for failure
    (loginUser as jest.Mock).mockImplementation(() => {
      return (dispatch: Dispatch<AuthActionTypes>) => {
        dispatch(loginFailure("Login failed"));
        //return Promise.reject(new Error("Login failed")); // Simulate failed login
      };
    });

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button"));

    // Wait for the state change to occur
    await waitFor(() => {
      expect(store.getState().auth.error).toBe("Login failed");
    });
    await waitFor(() => {
      console.log(`hi, ${JSON.stringify(store.getState())}`);
      expect(store.getState().auth.user).toBeNull();
    });

    // Ensure that loginUser was called with the incorrect password
    expect(loginUser).toHaveBeenCalledWith("testuser", "wrongpassword");
  });
});

describe("RegisterPage", () => {
  beforeEach(() => {
    // Clear previous mocks before each test
    jest.clearAllMocks();
  });
  it("should render the register form", () => {
    render(
      <Provider store={store}>
        <RegisterPage />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("should dispatch loginSuccess when register is successful", async () => {
    // Mock the thunk's behavior
    (registerUser as jest.Mock).mockImplementation((username: string) => {
      return (dispatch: Dispatch<AuthActionTypes>) => {
        dispatch(registerSuccess(username)); // Mock dispatching success
        // return Promise.resolve(true); // Simulate successful login
      };
    });

    render(
      <Provider store={store}>
        <RegisterPage />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button"));

    // Wait for the state change to occur (async action)
    await waitFor(() => {
      console.log(`hi, ${JSON.stringify(store.getState())}`);
      expect(store.getState().auth.user).toBe("testuser");
    });
    await waitFor(() => {
      console.log(`hi, ${JSON.stringify(store.getState())}`);
      expect(store.getState().auth.error).toBeNull();
    });
    // Ensure that loginUser was called with correct arguments
    expect(registerUser).toHaveBeenCalledWith("testuser", "password");
  });

  it("should dispatch registerFailure when login fails", async () => {
    // Mock the thunk's behavior for failure
    (registerUser as jest.Mock).mockImplementation(() => {
      return (dispatch: Dispatch<AuthActionTypes>) => {
        dispatch(registerFailure("Register failed"));
        //return Promise.reject(new Error("Login failed")); // Simulate failed login
      };
    });

    render(
      <Provider store={store}>
        <RegisterPage />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button"));

    // Wait for the state change to occur
    await waitFor(() => {
      expect(store.getState().auth.error).toBe("Register failed");
    });
    await waitFor(() => {
      console.log(`hi, ${JSON.stringify(store.getState())}`);
      expect(store.getState().auth.user).toBeNull();
    });

    // Ensure that loginUser was called with the incorrect password
    expect(registerUser).toHaveBeenCalledWith("testuser", "wrongpassword");
  });
});
