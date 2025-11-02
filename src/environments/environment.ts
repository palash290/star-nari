import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

export const environment = {
      production: true,
      apiUrl: 'http://my-prod-url',
      firebaseConfig: {
            apiKey: "AIzaSyBHhUuJmVp97wLaEKk0d0TzDrxL_AQA5Ng",
            authDomain: "star-nari.firebaseapp.com",
            projectId: "star-nari",
            storageBucket: "star-nari.firebasestorage.app",
            messagingSenderId: "621479880031",
            appId: "1:621479880031:web:3f19587bc50770614502ea",
            measurementId: "G-W7W442N7WY",
            vapidKey: 'BEth1UNGEwtbRvYprqD72fnfDj1J46db9pD5BoteN7rvaWgN0NHTKwd9l53DfqyUAbXqyTnDyPRcJ3apOXCyrb0'
      },

      linkedin: {
            clientId: '782bppslw7ms0r',
            redirectUri: 'http://localhost:4200/',
            scope: 'r_emailaddress r_liteprofile',
      },
      //Primary Client Secret: WPL_AP1.PpK443HdIrIHPTN1.x7+gJQ==
      // photoEditorLicense: "5RluAqhssyE_2jXwTnQd_ozzJs-WJuWK-mbpVzGtr3JTEiD2EVCvR3k14wWH_13f"
        photoEditorLicense: `{
    "owner": "Imgly Inc.",
    "version": "2.4",
    "license": "GtARY0IQ0tzLxAmZfavBpG-SaAlwhkRHUPOGqL3IIthMk_YrwtX9wB8lQ0BMAEwF"
  }`
  //5RluAqhssyE_2jXwTnQd_ozzJs-WJuWK-mbpVzGtr3JTEiD2EVCvR3k14wWH_13f
};
// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);