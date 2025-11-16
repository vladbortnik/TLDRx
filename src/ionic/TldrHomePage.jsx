/**
 * @fileoverview Placeholder Ionic page for TL;DRx.
 * Provides a basic IonPage shell and renders the existing App inside IonContent.
 */

import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import App from "../App.jsx";

/**
 * TldrHomePage component.
 *
 * @returns {JSX.Element} Ionic page wrapping the current TL;DRx App.
 */
export default function TldrHomePage() {
  return (
    <IonPage>
      <IonContent fullscreen>
        <App />
      </IonContent>
    </IonPage>
  );
}
