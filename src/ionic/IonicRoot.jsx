/**
 * @fileoverview Ionic root shell for TL;DRx.
 * Wraps the existing App component in IonApp + IonReactRouter + IonRouterOutlet.
 */

import React from "react";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import App from "../App.jsx";
import TldrHomePage from "./TldrHomePage.jsx";

/**
 * IonicRoot component.
 * Provides the Ionic application shell and routing entrypoint.
 *
 * @returns {JSX.Element} Ionic shell rendering the existing App at the root route.
 */
export default function IonicRoot() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={TldrHomePage} />
          <Route path="/ionic" component={TldrHomePage} />
          <Route path="/legacy" component={App} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
