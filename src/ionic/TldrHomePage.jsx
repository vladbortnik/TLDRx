/**
 * @fileoverview Ionic TL;DRx home page.
 * Uses IonPage + IonContent while reusing the existing React App.
 */

import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import App from "../App.jsx";

/**
 * TldrHomePage component.
 *
 * @returns {JSX.Element} Ionic page shell rendering the current TL;DRx App.
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
