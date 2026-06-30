import "./App.css";
import AppFooter from "./componentes/layout/Footer.tsx"

import AppRoutes from "./routes";

function App() {

    return (
        <>
            <AppRoutes />

            <AppFooter/>
        </>
    );
}

export default App;