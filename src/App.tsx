import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import HomePage from "./pages/Home";
import AddItemPage from "./pages/AddItemPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import { InventoryProvider } from "./context/InventoryContext";
import LoginPage from "./pages/Login";
import EditItemPage from "./pages/EditItemPage";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/tailwind.css";
import { AuthProvider } from "./context/AuthContext";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AuthProvider>
        <InventoryProvider>
          <IonRouterOutlet>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/home/:username" component={HomePage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/add-item" component={AddItemPage} />
            <Route exact path="/edit-item/:id" component={EditItemPage} />
            <Route exact path="/item-details/:id" component={ItemDetailsPage} />
            <Redirect to="/" />
          </IonRouterOutlet>
        </InventoryProvider>
      </AuthProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
