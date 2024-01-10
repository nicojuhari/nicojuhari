// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@formkit/nuxt', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  ui: {
    icons: ["ph"]
  },
  runtimeConfig: {
    firebaseAdmin: {
      "type": "service_account",
      "project_id": "app1foodmenu",
      "private_key_id": "23a15e989aae6cc9c4c1c51ce69ee31fe4e5f4c7",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDIcjWL3br9tfDj\nlkPkeupMLvxLgz+5bonUkpIBnJmW1LQTjlCKph6MpfZSSvYUnpG/xEG64gfdMjq5\nkE9ZV9KOwyWTrO2OaZYcECADXIk/FwGXxsxIAa+YQY5F+nd1gf7GUiyqwF9adyFc\n7d3Vbdo+fTI3xeZj9nGB9LvQD5WvxX2BBxNTkkboakgfkVmJ1AEcKXyeqF+O3odL\nt5LGlbOau07dOpdE3+0+yacqJQ9kxbxqadEcXzAC39GR3Syu0az+8E9b/MBIAMCN\npNl+21bXEM4rIuxfmuK6RshOwpXjXLKZWpzyIHzARETw2wqxZRxA0kJXk4qJZlRn\np/sgwCctAgMBAAECggEAKhdhiydaluBX31K0mwv8m1baf/jlrsi5hLvqkRATaIrt\n7ZVa8GKF078eBJXdKuNJc92Ad//y6s4batAU+YvpmTT9dQ9BK0Cc1vPD5TDPWUI5\ngWerigtgljZd6+/2meRcXcTvwEN5QoP1q4//n0vcIncjznZuNNuRZlq//aboJeqR\nk8eWw8iIHr56HTJTmyipSyHSYJmAbWjPagMe4h1tifMkQOK6av7T4/5EXaVlFmm9\nlXs6bOhRbCmkCyNwDpnZ+EeC2FPD4e5uJD6u6mquSjbZ+UiW4XjxtlGfEGaRYFdz\necK4TOpffEf4XPgktGnkr901whaPVJBKPc5rlXqwOQKBgQDmT/gtNMuhBRrS4MEz\nnP751GprwIqOhu1fhW7lye5eDpmKM2NmeBo1Xsy90Y9voegrBwMEJMdPEGprvVhr\n7njsVDH10JzDQit2VifdMWbEHyikziAnRIxv0bPubpcBdlreYFM33pe/Myo7xoRo\njxeo855x9D+TYqCOnJZH4y/2YwKBgQDezXqYE//7IrHYqQWh5ehBIttGi4as2hVz\neBvKioGdqP1N+4WnE4LPJjnYRWRHLqq/WX1/K9nVxukGDYZLEyCG4wrugweplIEY\nnITG23ha0kzn/lqH53U4n6qZQIkAvyNQ3tfPVmCD/A3Iougk0id7YRvACAYSQI/Z\nZdy7sAjZLwKBgD6gjk7UpW6isbmYLlE3psoOreWhFMxO+mtYIGDR+USQWcYP1T6+\n9/l9TtVrD8L+VuCkZniQ+7WPNDEZ6tpmnXE+L9u1H3ulGaZzJSHr1hMMmgO+nVWw\nOTQK5Q+3+M4H/gusS9TMbZ0rb5eTktvP1VI29OXt0f/k+N3uzJq9t4QbAoGAS2k1\nA2BRlgjqNTEQTPnqIJHRshDrpnmyJQEUNvumX1yhT9HALQq3jbGcho0GIemztUxu\n46pN8sN+f6P4PlTc/4q9WnlTEJzJDTF852nFVMg1a5h1v+YhkObJ8VEcjfoj0+15\nEh5kUIfximVJOZ0/68y0fcy5cVgU2DpX+dbdR9UCgYA3hN7BgyyqPxEo4qICeIIl\nWLyuOw6+4EdFO/FpnrkTxQjdNyT/M8sHeLlbZSdGluiZj8fjv8AP8CkGnph3vGN/\nzv86S/hpb3pyuwkErSbtTcNbPIdBrxez+vvIZE2lIWkrf3jzJ78Uaj69u4g7IYFr\nMWjbq+tuJVLOzuoGtLEWjg==\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-93d4n@app1foodmenu.iam.gserviceaccount.com",
      "client_id": "106824654129683533523",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-93d4n%40app1foodmenu.iam.gserviceaccount.com"
    },
    public: {
      firebase: {
        apiKey: "AIzaSyCzLLF-ZMuQe_qeUCS0xHHLgSppmtSj3bw",
        authDomain: "app1foodmenu.firebaseapp.com",
        projectId: "app1foodmenu",
        storageBucket: "app1foodmenu.appspot.com",
        messagingSenderId: "805781398319",
        appId: "1:805781398319:web:444b670b478571cbb577da",
        measurementId: process.env.MEASUREMENT_ID,
      }
    }
  }
})
