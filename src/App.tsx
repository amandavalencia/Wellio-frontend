import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { AuthProvider } from "./providers/AuthProvider";
import { ActivitiesProvider } from "./providers/ActivitiesProvider";

function App() {
  return (
    <AuthProvider>
      <ActivitiesProvider>
        <RouterProvider router={router} />
      </ActivitiesProvider>
    </AuthProvider>
  );
}

export default App;
