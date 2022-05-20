# Instructions

## First time only

The following instructions are only required if you have not yet installed `mkcert` on your system

* Install `mkcert` on your system (e.g. `brew install mkcert`)
* Install the mkcert root CA cert to your system keychain so that certs it has signed will be trusted on your system (except Firefox which has to be different. Google it if you care)

## Mobile instructions

These steps are also only required once

* Open the **Keychain Access** application
* Go to the **System** keychain
* Locate the mkcert CA certificate you installed earlier
* Drag it to the desktop
* Email it to yourself
* From your phone, tap on the cert attachment
* Choose your phone device
* Go to the **Settings** app
* Tap on **Profile Downloaded** near the top under your account info
* Install the mkcert cert
* Go to **Settings > General > About > Certificate Trust Settings**
* Enable full trust for the mkcert CA cert
* Now your phone (in particular, Safari) will trust certs signed by that mkcert CA cert (like the one we generated above)

## To generate a new cert

* Generate a cert and key for this application by running something like the following command:

```bash
mkcert example.com "*.example.com" localhost 127.0.0.1 ::1 192.168.1.10
```

which would generate two files, `example.com+5.pem` and `example.com+5-key.pem`.

* Configure the resulting files to be used by the dev server `vue.config.js`

```javascript
devServer: {
    https: {
        cert: fs.readFileSync("./sslcert/example.com+5.pem"),
        key: fs.readFileSync("./sslcert/example.com+5-key.pem")
    },
    port: 4433
}
```

* and/or configure them to be used by your production web server instead

### If your web server needs a different format, something like these commands may help

* extract the key from the key file

```bash
openssl pkey -in example.com+5-key.pem -out example.com+5.key
```

* extract the cert from the cert file

```bash
openssl x509 -outform der -in example.com+5.pem -out example.com+5.crt
```
