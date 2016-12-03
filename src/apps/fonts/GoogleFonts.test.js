import React from 'react';
// import ReactDOM from 'react-dom';
import $ from 'jquery';
import { GoogleFonts } from './GoogleFonts';
import ConsoleTab from '../../widgets/ConsoleTab';
import WebFonts from 'webfontloader';

describe('GoogleFonts', () => {

    let SampleData = {"kind":"webfonts#webfontList","items":[
        {"kind":"webfonts#webfont","family":"Roboto","category":"sans-serif","variants":["100","100italic","300","300italic","regular","italic","500","500italic","700","700italic","900","900italic"],"subsets":["greek","cyrillic","greek-ext","latin","cyrillic-ext","latin-ext","vietnamese"],"version":"v15","lastModified":"2016-10-05","files":{"100":"http://fonts.gstatic.com/s/roboto/v15/7MygqTe2zs9YkP0adA9QQQ.ttf","300":"http://fonts.gstatic.com/s/roboto/v15/dtpHsbgPEm2lVWciJZ0P-A.ttf","500":"http://fonts.gstatic.com/s/roboto/v15/Uxzkqj-MIMWle-XP2pDNAA.ttf","700":"http://fonts.gstatic.com/s/roboto/v15/bdHGHleUa-ndQCOrdpfxfw.ttf","900":"http://fonts.gstatic.com/s/roboto/v15/H1vB34nOKWXqzKotq25pcg.ttf","100italic":"http://fonts.gstatic.com/s/roboto/v15/T1xnudodhcgwXCmZQ490TPesZW2xOQ-xsNqO47m55DA.ttf","300italic":"http://fonts.gstatic.com/s/roboto/v15/iE8HhaRzdhPxC93dOdA056CWcynf_cDxXwCLxiixG1c.ttf","regular":"http://fonts.gstatic.com/s/roboto/v15/W5F8_SL0XFawnjxHGsZjJA.ttf","italic":"http://fonts.gstatic.com/s/roboto/v15/hcKoSgxdnKlbH5dlTwKbow.ttf","500italic":"http://fonts.gstatic.com/s/roboto/v15/daIfzbEw-lbjMyv4rMUUTqCWcynf_cDxXwCLxiixG1c.ttf","700italic":"http://fonts.gstatic.com/s/roboto/v15/owYYXKukxFDFjr0ZO8NXh6CWcynf_cDxXwCLxiixG1c.ttf","900italic":"http://fonts.gstatic.com/s/roboto/v15/b9PWBSMHrT2zM5FgUdtu0aCWcynf_cDxXwCLxiixG1c.ttf"},"popularity":0,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Open Sans","category":"sans-serif","variants":["300","300italic","regular","italic","600","600italic","700","700italic","800","800italic"],"subsets":["greek","cyrillic","greek-ext","latin","cyrillic-ext","latin-ext","vietnamese"],"version":"v13","lastModified":"2016-10-05","files":{"300":"http://fonts.gstatic.com/s/opensans/v13/DXI1ORHCpsQm3Vp6mXoaTS3USBnSvpkopQaUR-2r7iU.ttf","600":"http://fonts.gstatic.com/s/opensans/v13/MTP_ySUJH_bn48VBG8sNSi3USBnSvpkopQaUR-2r7iU.ttf","700":"http://fonts.gstatic.com/s/opensans/v13/k3k702ZOKiLJc3WVjuplzC3USBnSvpkopQaUR-2r7iU.ttf","800":"http://fonts.gstatic.com/s/opensans/v13/EInbV5DfGHOiMmvb1Xr-hi3USBnSvpkopQaUR-2r7iU.ttf","300italic":"http://fonts.gstatic.com/s/opensans/v13/PRmiXeptR36kaC0GEAetxi9-WlPSxbfiI49GsXo3q0g.ttf","regular":"http://fonts.gstatic.com/s/opensans/v13/IgZJs4-7SA1XX_edsoXWog.ttf","italic":"http://fonts.gstatic.com/s/opensans/v13/O4NhV7_qs9r9seTo7fnsVKCWcynf_cDxXwCLxiixG1c.ttf","600italic":"http://fonts.gstatic.com/s/opensans/v13/PRmiXeptR36kaC0GEAetxpZ7xm-Bj30Bj2KNdXDzSZg.ttf","700italic":"http://fonts.gstatic.com/s/opensans/v13/PRmiXeptR36kaC0GEAetxne1Pd76Vl7zRpE7NLJQ7XU.ttf","800italic":"http://fonts.gstatic.com/s/opensans/v13/PRmiXeptR36kaC0GEAetxg89PwPrYLaRFJ-HNCU9NbA.ttf"},"popularity":1,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Lato","category":"sans-serif","variants":["100","100italic","300","300italic","regular","italic","700","700italic","900","900italic"],"subsets":["latin","latin-ext"],"version":"v11","lastModified":"2016-11-01","files":{"100":"http://fonts.gstatic.com/s/lato/v11/Upp-ka9rLQmHYCsFgwL-eg.ttf","300":"http://fonts.gstatic.com/s/lato/v11/Ja02qOppOVq9jeRjWekbHg.ttf","700":"http://fonts.gstatic.com/s/lato/v11/iX_QxBBZLhNj5JHlTzHQzg.ttf","900":"http://fonts.gstatic.com/s/lato/v11/8TPEV6NbYWZlNsXjbYVv7w.ttf","100italic":"http://fonts.gstatic.com/s/lato/v11/zLegi10uS_9-fnUDISl0KA.ttf","300italic":"http://fonts.gstatic.com/s/lato/v11/dVebFcn7EV7wAKwgYestUg.ttf","regular":"http://fonts.gstatic.com/s/lato/v11/h7rISIcQapZBpei-sXwIwg.ttf","italic":"http://fonts.gstatic.com/s/lato/v11/P_dJOFJylV3A870UIOtr0w.ttf","700italic":"http://fonts.gstatic.com/s/lato/v11/WFcZakHrrCKeUJxHA4T_gw.ttf","900italic":"http://fonts.gstatic.com/s/lato/v11/draWperrI7n2xi35Cl08fA.ttf"},"popularity":2,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Slabo 27px","category":"serif","variants":["regular"],"subsets":["latin","latin-ext"],"version":"v3","lastModified":"2016-10-27","files":{"regular":"http://fonts.gstatic.com/s/slabo27px/v3/gC0o8B9eU21EafNkXlRAfPesZW2xOQ-xsNqO47m55DA.ttf"},"popularity":3,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Oswald","category":"sans-serif","variants":["300","regular","700"],"subsets":["latin","latin-ext"],"version":"v11","lastModified":"2016-07-31","files":{"300":"http://fonts.gstatic.com/s/oswald/v11/y3tZpCdiRD4oNRRYFcAR5Q.ttf","700":"http://fonts.gstatic.com/s/oswald/v11/7wj8ldV_5Ti37rHa0m1DDw.ttf","regular":"http://fonts.gstatic.com/s/oswald/v11/uLEd2g2vJglLPfsBF91DCg.ttf"},"popularity":4,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Roboto Condensed","category":"sans-serif","variants":["300","300italic","regular","italic","700","700italic"],"subsets":["greek","cyrillic","greek-ext","latin","cyrillic-ext","latin-ext","vietnamese"],"version":"v13","lastModified":"2016-10-05","files":{"300":"http://fonts.gstatic.com/s/robotocondensed/v13/b9QBgL0iMZfDSpmcXcE8nJRhFVcex_hajThhFkHyhYk.ttf","700":"http://fonts.gstatic.com/s/robotocondensed/v13/b9QBgL0iMZfDSpmcXcE8nPOYkGiSOYDq_T7HbIOV1hA.ttf","300italic":"http://fonts.gstatic.com/s/robotocondensed/v13/mg0cGfGRUERshzBlvqxeAPYa9bgCHecWXGgisnodcS0.ttf","regular":"http://fonts.gstatic.com/s/robotocondensed/v13/Zd2E9abXLFGSr9G3YK2MsKDbm6fPDOZJsR8PmdG62gY.ttf","italic":"http://fonts.gstatic.com/s/robotocondensed/v13/BP5K8ZAJv9qEbmuFp8RpJY_eiqgTfYGaH0bJiUDZ5GA.ttf","700italic":"http://fonts.gstatic.com/s/robotocondensed/v13/mg0cGfGRUERshzBlvqxeAE2zk2RGRC3SlyyLLQfjS_8.ttf"},"popularity":5,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Source Sans Pro","category":"sans-serif","variants":["200","200italic","300","300italic","regular","italic","600","600italic","700","700italic","900","900italic"],"subsets":["latin","latin-ext","vietnamese"],"version":"v9","lastModified":"2016-07-31","files":{"200":"http://fonts.gstatic.com/s/sourcesanspro/v9/toadOcfmlt9b38dHJxOBGKXvKVW_haheDNrHjziJZVk.ttf","300":"http://fonts.gstatic.com/s/sourcesanspro/v9/toadOcfmlt9b38dHJxOBGFP7R5lD_au4SZC6Ks_vyWs.ttf","600":"http://fonts.gstatic.com/s/sourcesanspro/v9/toadOcfmlt9b38dHJxOBGOiMeWyi5E_-XkTgB5psiDg.ttf","700":"http://fonts.gstatic.com/s/sourcesanspro/v9/toadOcfmlt9b38dHJxOBGPgXsetDviZcdR5OzC1KPcw.ttf","900":"http://fonts.gstatic.com/s/sourcesanspro/v9/toadOcfmlt9b38dHJxOBGBA_awHl7mXRjE_LQVochcU.ttf","200italic":"http://fonts.gstatic.com/s/sourcesanspro/v9/fpTVHK8qsXbIeTHTrnQH6OptKU7UIBg2hLM7eMTU8bI.ttf","300italic":"http://fonts.gstatic.com/s/sourcesanspro/v9/fpTVHK8qsXbIeTHTrnQH6DUpNKoQAsDux-Todp8f29w.ttf","regular":"http://fonts.gstatic.com/s/sourcesanspro/v9/ODelI1aHBYDBqgeIAH2zlNRl0pGnog23EMYRrBmUzJQ.ttf","italic":"http://fonts.gstatic.com/s/sourcesanspro/v9/M2Jd71oPJhLKp0zdtTvoMwRX4TIfMQQEXLu74GftruE.ttf","600italic":"http://fonts.gstatic.com/s/sourcesanspro/v9/fpTVHK8qsXbIeTHTrnQH6Pp6lGoTTgjlW0sC4r900Co.ttf","700italic":"http://fonts.gstatic.com/s/sourcesanspro/v9/fpTVHK8qsXbIeTHTrnQH6LVT4locI09aamSzFGQlDMY.ttf","900italic":"http://fonts.gstatic.com/s/sourcesanspro/v9/fpTVHK8qsXbIeTHTrnQH6A0NcF6HPGWR298uWIdxWv0.ttf"},"popularity":6,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Montserrat","category":"sans-serif","variants":["regular","700"],"subsets":["latin"],"version":"v7","lastModified":"2016-07-31","files":{"700":"http://fonts.gstatic.com/s/montserrat/v7/IQHow_FEYlDC4Gzy_m8fcgJKKGfqHaYFsRG-T3ceEVo.ttf","regular":"http://fonts.gstatic.com/s/montserrat/v7/Kqy6-utIpx_30Xzecmeo8_esZW2xOQ-xsNqO47m55DA.ttf"},"popularity":7,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Raleway","category":"sans-serif","variants":["100","100italic","200","200italic","300","300italic","regular","italic","500","500italic","600","600italic","700","700italic","800","800italic","900","900italic"],"subsets":["latin","latin-ext"],"version":"v11","lastModified":"2016-06-07","files":{"100":"http://fonts.gstatic.com/s/raleway/v11/UDfD6oxBaBnmFJwQ7XAFNw.ttf","200":"http://fonts.gstatic.com/s/raleway/v11/LAQwev4hdCtYkOYX4Oc7nPesZW2xOQ-xsNqO47m55DA.ttf","300":"http://fonts.gstatic.com/s/raleway/v11/2VvSZU2kb4DZwFfRM4fLQPesZW2xOQ-xsNqO47m55DA.ttf","500":"http://fonts.gstatic.com/s/raleway/v11/348gn6PEmbLDWlHbbV15d_esZW2xOQ-xsNqO47m55DA.ttf","600":"http://fonts.gstatic.com/s/raleway/v11/M7no6oPkwKYJkedjB1wqEvesZW2xOQ-xsNqO47m55DA.ttf","700":"http://fonts.gstatic.com/s/raleway/v11/VGEV9-DrblisWOWLbK-1XPesZW2xOQ-xsNqO47m55DA.ttf","800":"http://fonts.gstatic.com/s/raleway/v11/mMh0JrsYMXcLO69jgJwpUvesZW2xOQ-xsNqO47m55DA.ttf","900":"http://fonts.gstatic.com/s/raleway/v11/ajQQGcDBLcyLpaUfD76UuPesZW2xOQ-xsNqO47m55DA.ttf","100italic":"http://fonts.gstatic.com/s/raleway/v11/hUpHtml6IPNuUR-FwVi2UKCWcynf_cDxXwCLxiixG1c.ttf","200italic":"http://fonts.gstatic.com/s/raleway/v11/N2DIbZG4399cPGfifZUEQi3USBnSvpkopQaUR-2r7iU.ttf","300italic":"http://fonts.gstatic.com/s/raleway/v11/TVSB8ogXDKMcnAAJ5CqrUi3USBnSvpkopQaUR-2r7iU.ttf","regular":"http://fonts.gstatic.com/s/raleway/v11/_dCzxpXzIS3sL-gdJWAP8A.ttf","italic":"http://fonts.gstatic.com/s/raleway/v11/utU2m1gdZSfuQpArSy5Dbw.ttf","500italic":"http://fonts.gstatic.com/s/raleway/v11/S7vGLZZ40c85SJgiptJGVy3USBnSvpkopQaUR-2r7iU.ttf","600italic":"http://fonts.gstatic.com/s/raleway/v11/OY22yoG8EJ3IN_muVWm29C3USBnSvpkopQaUR-2r7iU.ttf","700italic":"http://fonts.gstatic.com/s/raleway/v11/lFxvRPuGFG5ktd7P0WRwKi3USBnSvpkopQaUR-2r7iU.ttf","800italic":"http://fonts.gstatic.com/s/raleway/v11/us4LjTCmlYgh3W8CKujEJi3USBnSvpkopQaUR-2r7iU.ttf","900italic":"http://fonts.gstatic.com/s/raleway/v11/oY2RadnkHfshu5f0FLsgVS3USBnSvpkopQaUR-2r7iU.ttf"},"popularity":8,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"PT Sans","category":"sans-serif","variants":["regular","italic","700","700italic"],"subsets":["cyrillic","latin","cyrillic-ext","latin-ext"],"version":"v8","lastModified":"2016-07-31","files":{"700":"http://fonts.gstatic.com/s/ptsans/v8/F51BEgHuR0tYHxF0bD4vwvesZW2xOQ-xsNqO47m55DA.ttf","regular":"http://fonts.gstatic.com/s/ptsans/v8/UFoEz2uiuMypUGZL1NKoeg.ttf","italic":"http://fonts.gstatic.com/s/ptsans/v8/yls9EYWOd496wiu7qzfgNg.ttf","700italic":"http://fonts.gstatic.com/s/ptsans/v8/lILlYDvubYemzYzN7GbLkC3USBnSvpkopQaUR-2r7iU.ttf"},"popularity":9,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Roboto Slab","category":"serif","variants":["100","300","regular","700"],"subsets":["greek","cyrillic","greek-ext","latin","cyrillic-ext","latin-ext","vietnamese"],"version":"v6","lastModified":"2016-10-05","files":{"100":"http://fonts.gstatic.com/s/robotoslab/v6/MEz38VLIFL-t46JUtkIEgIAWxXGWZ3yJw6KhWS7MxOk.ttf","300":"http://fonts.gstatic.com/s/robotoslab/v6/dazS1PrQQuCxC3iOAJFEJS9-WlPSxbfiI49GsXo3q0g.ttf","700":"http://fonts.gstatic.com/s/robotoslab/v6/dazS1PrQQuCxC3iOAJFEJXe1Pd76Vl7zRpE7NLJQ7XU.ttf","regular":"http://fonts.gstatic.com/s/robotoslab/v6/3__ulTNA7unv0UtplybPiqCWcynf_cDxXwCLxiixG1c.ttf"},"popularity":10,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Open Sans Condensed","category":"sans-serif","variants":["300","300italic","700"],"subsets":["greek","cyrillic","greek-ext","latin","cyrillic-ext","latin-ext","vietnamese"],"version":"v10","lastModified":"2016-10-05","files":{"300":"http://fonts.gstatic.com/s/opensanscondensed/v10/gk5FxslNkTTHtojXrkp-xEMwSSh38KQVJx4ABtsZTnA.ttf","700":"http://fonts.gstatic.com/s/opensanscondensed/v10/gk5FxslNkTTHtojXrkp-xBEM87DM3yorPOrvA-vB930.ttf","300italic":"http://fonts.gstatic.com/s/opensanscondensed/v10/jIXlqT1WKafUSwj6s9AzV4_LkTZ_uhAwfmGJ084hlvM.ttf"},"popularity":11,"loaded":false,"defaultStyle":"300"},
        {"kind":"webfonts#webfont","family":"Merriweather","category":"serif","variants":["300","300italic","regular","italic","700","700italic","900","900italic"],"subsets":["cyrillic","latin","cyrillic-ext","latin-ext"],"version":"v13","lastModified":"2016-06-07","files":{"300":"http://fonts.gstatic.com/s/merriweather/v13/ZvcMqxEwPfh2qDWBPxn6nqcQoVhARpoaILP7amxE_8g.ttf","700":"http://fonts.gstatic.com/s/merriweather/v13/ZvcMqxEwPfh2qDWBPxn6nkD2ttfZwueP-QU272T9-k4.ttf","900":"http://fonts.gstatic.com/s/merriweather/v13/ZvcMqxEwPfh2qDWBPxn6nqObDOjC3UL77puoeHsE3fw.ttf","300italic":"http://fonts.gstatic.com/s/merriweather/v13/EYh7Vl4ywhowqULgRdYwICna0FLWfcB-J_SAYmcAXaI.ttf","regular":"http://fonts.gstatic.com/s/merriweather/v13/RFda8w1V0eDZheqfcyQ4EC3USBnSvpkopQaUR-2r7iU.ttf","italic":"http://fonts.gstatic.com/s/merriweather/v13/So5lHxHT37p2SS4-t60SlPMZXuCXbOrAvx5R0IT5Oyo.ttf","700italic":"http://fonts.gstatic.com/s/merriweather/v13/EYh7Vl4ywhowqULgRdYwIPAs9-1nE9qOqhChW0m4nDE.ttf","900italic":"http://fonts.gstatic.com/s/merriweather/v13/EYh7Vl4ywhowqULgRdYwIBd0_s6jQr9r5s5OZYvtzBY.ttf"},"popularity":12,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Droid Sans","category":"sans-serif","variants":["regular","700"],"subsets":["latin"],"version":"v6","lastModified":"2016-10-05","files":{"700":"http://fonts.gstatic.com/s/droidsans/v6/EFpQQyG9GqCrobXxL-KRMQJKKGfqHaYFsRG-T3ceEVo.ttf","regular":"http://fonts.gstatic.com/s/droidsans/v6/rS9BT6-asrfjpkcV3DXf__esZW2xOQ-xsNqO47m55DA.ttf"},"popularity":13,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Lora","category":"serif","variants":["regular","italic","700","700italic"],"subsets":["cyrillic","latin","latin-ext"],"version":"v9","lastModified":"2016-06-07","files":{"700":"http://fonts.gstatic.com/s/lora/v9/enKND5SfzQKkggBA_VnT1A.ttf","regular":"http://fonts.gstatic.com/s/lora/v9/aXJ7KVIGcejEy1abawZazg.ttf","italic":"http://fonts.gstatic.com/s/lora/v9/AN2EZaj2tFRpyveuNn9BOg.ttf","700italic":"http://fonts.gstatic.com/s/lora/v9/ivs9j3kYU65pR9QD9YFdzQ.ttf"},"popularity":14,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Ubuntu","category":"sans-serif","variants":["300","300italic","regular","italic","500","500italic","700","700italic"],"subsets":["greek","cyrillic","greek-ext","latin","cyrillic-ext","latin-ext"],"version":"v9","lastModified":"2016-06-03","files":{"300":"http://fonts.gstatic.com/s/ubuntu/v9/7-wH0j2QCTHKgp7vLh9-sQ.ttf","500":"http://fonts.gstatic.com/s/ubuntu/v9/bMbHEMwSUmkzcK2x_74QbA.ttf","700":"http://fonts.gstatic.com/s/ubuntu/v9/B7BtHjNYwAp3HgLNagENOQ.ttf","300italic":"http://fonts.gstatic.com/s/ubuntu/v9/j-TYDdXcC_eQzhhp386SjaCWcynf_cDxXwCLxiixG1c.ttf","regular":"http://fonts.gstatic.com/s/ubuntu/v9/lhhB5ZCwEkBRbHMSnYuKyA.ttf","italic":"http://fonts.gstatic.com/s/ubuntu/v9/b9hP8wd30SygxZjGGk4DCQ.ttf","500italic":"http://fonts.gstatic.com/s/ubuntu/v9/NWdMogIO7U6AtEM4dDdf_aCWcynf_cDxXwCLxiixG1c.ttf","700italic":"http://fonts.gstatic.com/s/ubuntu/v9/pqisLQoeO9YTDCNnlQ9bf6CWcynf_cDxXwCLxiixG1c.ttf"},"popularity":15,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Droid Serif","category":"serif","variants":["regular","italic","700","700italic"],"subsets":["latin"],"version":"v6","lastModified":"2016-10-05","files":{"700":"http://fonts.gstatic.com/s/droidserif/v6/QQt14e8dY39u-eYBZmppwXe1Pd76Vl7zRpE7NLJQ7XU.ttf","regular":"http://fonts.gstatic.com/s/droidserif/v6/DgAtPy6rIVa2Zx3Xh9KaNaCWcynf_cDxXwCLxiixG1c.ttf","italic":"http://fonts.gstatic.com/s/droidserif/v6/cj2hUnSRBhwmSPr9kS5890eOrDcLawS7-ssYqLr2Xp4.ttf","700italic":"http://fonts.gstatic.com/s/droidserif/v6/c92rD_x0V1LslSFt3-QEps_zJjSACmk0BRPxQqhnNLU.ttf"},"popularity":16,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Playfair Display","category":"serif","variants":["regular","italic","700","700italic","900","900italic"],"subsets":["cyrillic","latin","latin-ext"],"version":"v10","lastModified":"2016-06-07","files":{"700":"http://fonts.gstatic.com/s/playfairdisplay/v10/UC3ZEjagJi85gF9qFaBgICsv6SrURqJprbhH_C1Mw8w.ttf","900":"http://fonts.gstatic.com/s/playfairdisplay/v10/UC3ZEjagJi85gF9qFaBgIKqwMe2wjvZrAR44M0BJZ48.ttf","regular":"http://fonts.gstatic.com/s/playfairdisplay/v10/2NBgzUtEeyB-Xtpr9bm1CV6uyC_qD11hrFQ6EGgTJWI.ttf","italic":"http://fonts.gstatic.com/s/playfairdisplay/v10/9MkijrV-dEJ0-_NWV7E6NzMsbnvDNEBX25F5HWk9AhI.ttf","700italic":"http://fonts.gstatic.com/s/playfairdisplay/v10/n7G4PqJvFP2Kubl0VBLDECsYW3XoOVcYyYdp9NzzS9E.ttf","900italic":"http://fonts.gstatic.com/s/playfairdisplay/v10/n7G4PqJvFP2Kubl0VBLDEC0JfJ4xmm7j1kL6D7mPxrA.ttf"},"popularity":17,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Arimo","category":"sans-serif","variants":["regular","italic","700","700italic"],"subsets":["greek","cyrillic","greek-ext","latin","cyrillic-ext","latin-ext","vietnamese","hebrew"],"version":"v9","lastModified":"2016-10-05","files":{"700":"http://fonts.gstatic.com/s/arimo/v9/ZItXugREyvV9LnbY_gxAmw.ttf","regular":"http://fonts.gstatic.com/s/arimo/v9/Gpeo80g-5ji2CcyXWnzh7g.ttf","italic":"http://fonts.gstatic.com/s/arimo/v9/_OdGbnX2-qQ96C4OjhyuPw.ttf","700italic":"http://fonts.gstatic.com/s/arimo/v9/__nOLWqmeXdhfr0g7GaFePesZW2xOQ-xsNqO47m55DA.ttf"},"popularity":18,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Noto Sans","category":"sans-serif","variants":["regular","italic","700","700italic"],"subsets":["greek","devanagari","cyrillic","greek-ext","latin","cyrillic-ext","latin-ext","vietnamese"],"version":"v6","lastModified":"2016-10-05","files":{"700":"http://fonts.gstatic.com/s/notosans/v6/PIbvSEyHEdL91QLOQRnZ1y3USBnSvpkopQaUR-2r7iU.ttf","regular":"http://fonts.gstatic.com/s/notosans/v6/0Ue9FiUJwVhi4NGfHJS5uA.ttf","italic":"http://fonts.gstatic.com/s/notosans/v6/dLcNKMgJ1H5RVoZFraDz0qCWcynf_cDxXwCLxiixG1c.ttf","700italic":"http://fonts.gstatic.com/s/notosans/v6/9Z3uUWMRR7crzm1TjRicDne1Pd76Vl7zRpE7NLJQ7XU.ttf"},"popularity":19,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"PT Sans Narrow","category":"sans-serif","variants":["regular","700"],"subsets":["cyrillic","latin","cyrillic-ext","latin-ext"],"version":"v7","lastModified":"2016-07-31","files":{"700":"http://fonts.gstatic.com/s/ptsansnarrow/v7/Q_pTky3Sc3ubRibGToTAYsLtdzs3iyjn_YuT226ZsLU.ttf","regular":"http://fonts.gstatic.com/s/ptsansnarrow/v7/UyYrYy3ltEffJV9QueSi4ZTvAuddT2xDMbdz0mdLyZY.ttf"},"popularity":20,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Titillium Web","category":"sans-serif","variants":["200","200italic","300","300italic","regular","italic","600","600italic","700","700italic","900"],"subsets":["latin","latin-ext"],"version":"v4","lastModified":"2016-07-31","files":{"200":"http://fonts.gstatic.com/s/titilliumweb/v4/anMUvcNT0H1YN4FII8wprzOdCrLccoxq42eaxM802O0.ttf","300":"http://fonts.gstatic.com/s/titilliumweb/v4/anMUvcNT0H1YN4FII8wpr9ZAkYT8DuUZELiKLwMGWAo.ttf","600":"http://fonts.gstatic.com/s/titilliumweb/v4/anMUvcNT0H1YN4FII8wpr28K9dEd5Ue-HTQrlA7E2xQ.ttf","700":"http://fonts.gstatic.com/s/titilliumweb/v4/anMUvcNT0H1YN4FII8wpr2-6tpSbB9YhmWtmd1_gi_U.ttf","900":"http://fonts.gstatic.com/s/titilliumweb/v4/anMUvcNT0H1YN4FII8wpr7L0GmZLri-m-nfoo0Vul4Y.ttf","200italic":"http://fonts.gstatic.com/s/titilliumweb/v4/RZunN20OBmkvrU7sA4GPPj4N98U-66ThNJvtgddRfBE.ttf","300italic":"http://fonts.gstatic.com/s/titilliumweb/v4/RZunN20OBmkvrU7sA4GPPrfzCkqg7ORZlRf2cc4mXu8.ttf","regular":"http://fonts.gstatic.com/s/titilliumweb/v4/7XUFZ5tgS-tD6QamInJTcTyagQBwYgYywpS70xNq8SQ.ttf","italic":"http://fonts.gstatic.com/s/titilliumweb/v4/r9OmwyQxrgzUAhaLET_KO-ixohbIP6lHkU-1Mgq95cY.ttf","600italic":"http://fonts.gstatic.com/s/titilliumweb/v4/RZunN20OBmkvrU7sA4GPPgOhzTSndyK8UWja2yJjKLc.ttf","700italic":"http://fonts.gstatic.com/s/titilliumweb/v4/RZunN20OBmkvrU7sA4GPPio3LEw-4MM8Ao2j9wPOfpw.ttf"},"popularity":21,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"PT Serif","category":"serif","variants":["regular","italic","700","700italic"],"subsets":["cyrillic","latin","cyrillic-ext","latin-ext"],"version":"v8","lastModified":"2016-07-31","files":{"700":"http://fonts.gstatic.com/s/ptserif/v8/kyZw18tqQ5if-_wpmxxOeKCWcynf_cDxXwCLxiixG1c.ttf","regular":"http://fonts.gstatic.com/s/ptserif/v8/sAo427rn3-QL9sWCbMZXhA.ttf","italic":"http://fonts.gstatic.com/s/ptserif/v8/9khWhKzhpkH0OkNnBKS3n_esZW2xOQ-xsNqO47m55DA.ttf","700italic":"http://fonts.gstatic.com/s/ptserif/v8/Foydq9xJp--nfYIx2TBz9QJKKGfqHaYFsRG-T3ceEVo.ttf"},"popularity":22,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Muli","category":"sans-serif","variants":["300","300italic","regular","italic"],"subsets":["latin"],"version":"v9","lastModified":"2016-11-21","files":{"300":"http://fonts.gstatic.com/s/muli/v9/VJw4F3ZHRAZ7Hmg3nQu5YQ.ttf","300italic":"http://fonts.gstatic.com/s/muli/v9/s-NKMCru8HiyjEt0ZDoBoA.ttf","regular":"http://fonts.gstatic.com/s/muli/v9/KJiP6KznxbALQgfJcDdPAw.ttf","italic":"http://fonts.gstatic.com/s/muli/v9/Cg0K_IWANs9xkNoxV7H1_w.ttf"},"popularity":23,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Inconsolata","category":"monospace","variants":["regular","700"],"subsets":["latin","latin-ext"],"version":"v14","lastModified":"2016-11-21","files":{"700":"http://fonts.gstatic.com/s/inconsolata/v14/AIed271kqQlcIRSOnQH0yXe1Pd76Vl7zRpE7NLJQ7XU.ttf","regular":"http://fonts.gstatic.com/s/inconsolata/v14/7bMKuoy6Nh0ft0SHnIGMuaCWcynf_cDxXwCLxiixG1c.ttf"},"popularity":24,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Indie Flower","category":"handwriting","variants":["regular"],"subsets":["latin"],"version":"v8","lastModified":"2016-07-31","files":{"regular":"http://fonts.gstatic.com/s/indieflower/v8/10JVD_humAd5zP2yrFqw6i3USBnSvpkopQaUR-2r7iU.ttf"},"popularity":25,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Bitter","category":"serif","variants":["regular","italic","700"],"subsets":["latin","latin-ext"],"version":"v10","lastModified":"2016-11-21","files":{"700":"http://fonts.gstatic.com/s/bitter/v10/4dUtr_4BvHuoRU35suyOAg.ttf","regular":"http://fonts.gstatic.com/s/bitter/v10/w_BNdJvVZDRmqy5aSfB2kQ.ttf","italic":"http://fonts.gstatic.com/s/bitter/v10/TC0FZEVzXQIGgzmRfKPZbA.ttf"},"popularity":26,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Dosis","category":"sans-serif","variants":["200","300","regular","500","600","700","800"],"subsets":["latin","latin-ext"],"version":"v6","lastModified":"2016-07-31","files":{"200":"http://fonts.gstatic.com/s/dosis/v6/ztftab0r6hcd7AeurUGrSQ.ttf","300":"http://fonts.gstatic.com/s/dosis/v6/awIB6L0h5mb0plIKorXmuA.ttf","500":"http://fonts.gstatic.com/s/dosis/v6/ruEXDOFMxDPGnjCBKRqdAQ.ttf","600":"http://fonts.gstatic.com/s/dosis/v6/KNAswRNwm3tfONddYyidxg.ttf","700":"http://fonts.gstatic.com/s/dosis/v6/AEEAj0ONidK8NQQMBBlSig.ttf","800":"http://fonts.gstatic.com/s/dosis/v6/nlrKd8E69vvUU39XGsvR7Q.ttf","regular":"http://fonts.gstatic.com/s/dosis/v6/rJRlixu-w0JZ1MyhJpao_Q.ttf"},"popularity":27,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Oxygen","category":"sans-serif","variants":["300","regular","700"],"subsets":["latin","latin-ext"],"version":"v5","lastModified":"2016-06-07","files":{"300":"http://fonts.gstatic.com/s/oxygen/v5/lZ31r0bR1Bzt_DfGZu1S8A.ttf","700":"http://fonts.gstatic.com/s/oxygen/v5/yLqkmDwuNtt5pSqsJmhyrg.ttf","regular":"http://fonts.gstatic.com/s/oxygen/v5/uhoyAE7XlQL22abzQieHjw.ttf"},"popularity":28,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Hind","category":"sans-serif","variants":["300","regular","500","600","700"],"subsets":["devanagari","latin","latin-ext"],"version":"v6","lastModified":"2016-06-02","files":{"300":"http://fonts.gstatic.com/s/hind/v6/qa346Adgv9kPDXoD1my4kA.ttf","500":"http://fonts.gstatic.com/s/hind/v6/2cs8RCVcYtiv4iNDH1UsQQ.ttf","600":"http://fonts.gstatic.com/s/hind/v6/TUKUmFMXSoxloBP1ni08oA.ttf","700":"http://fonts.gstatic.com/s/hind/v6/cXJJavLdUbCfjxlsA6DqTw.ttf","regular":"http://fonts.gstatic.com/s/hind/v6/mktFHh5Z5P9YjGKSslSUtA.ttf"},"popularity":29,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Fjalla One","category":"sans-serif","variants":["regular"],"subsets":["latin","latin-ext"],"version":"v4","lastModified":"2016-06-07","files":{"regular":"http://fonts.gstatic.com/s/fjallaone/v4/3b7vWCfOZsU53vMa8LWsf_esZW2xOQ-xsNqO47m55DA.ttf"},"popularity":30,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Cabin","category":"sans-serif","variants":["regular","italic","500","500italic","600","600italic","700","700italic"],"subsets":["latin"],"version":"v9","lastModified":"2016-07-31","files":{"500":"http://fonts.gstatic.com/s/cabin/v9/HgsCQ-k3_Z_uQ86aFolNBg.ttf","600":"http://fonts.gstatic.com/s/cabin/v9/eUDAvKhBtmTCkeVBsFk34A.ttf","700":"http://fonts.gstatic.com/s/cabin/v9/4EKhProuY1hq_WCAomq9Dg.ttf","regular":"http://fonts.gstatic.com/s/cabin/v9/XeuAFYo2xAPHxZGBbQtHhA.ttf","italic":"http://fonts.gstatic.com/s/cabin/v9/0tJ9k3DI5xC4GBgs1E_Jxw.ttf","500italic":"http://fonts.gstatic.com/s/cabin/v9/50sjhrGE0njyO-7mGDhGP_esZW2xOQ-xsNqO47m55DA.ttf","600italic":"http://fonts.gstatic.com/s/cabin/v9/sFQpQDBd3G2om0Nl5dD2CvesZW2xOQ-xsNqO47m55DA.ttf","700italic":"http://fonts.gstatic.com/s/cabin/v9/K83QKi8MOKLEqj6bgZ7LrfesZW2xOQ-xsNqO47m55DA.ttf"},"popularity":31,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Nunito","category":"sans-serif","variants":["300","regular","700"],"subsets":["latin"],"version":"v7","lastModified":"2016-07-31","files":{"300":"http://fonts.gstatic.com/s/nunito/v7/zXQvrWBJqUooM7Xv98MrQw.ttf","700":"http://fonts.gstatic.com/s/nunito/v7/aEdlqgMuYbpe4U3TnqOQMA.ttf","regular":"http://fonts.gstatic.com/s/nunito/v7/ySZTeT3IuzJj0GK6uGpbBg.ttf"},"popularity":32,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Arvo","category":"serif","variants":["regular","italic","700","700italic"],"subsets":["latin"],"version":"v9","lastModified":"2016-06-07","files":{"700":"http://fonts.gstatic.com/s/arvo/v9/OB3FDST7U38u3OjPK_vvRQ.ttf","regular":"http://fonts.gstatic.com/s/arvo/v9/vvWPwz-PlZEwjOOIKqoZzA.ttf","italic":"http://fonts.gstatic.com/s/arvo/v9/id5a4BCjbenl5Gkqonw_Rw.ttf","700italic":"http://fonts.gstatic.com/s/arvo/v9/Hvl2MuWoXLaCy2v6MD4Yvw.ttf"},"popularity":33,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Poppins","category":"sans-serif","variants":["300","regular","500","600","700"],"subsets":["devanagari","latin","latin-ext"],"version":"v1","lastModified":"2016-06-07","files":{"300":"http://fonts.gstatic.com/s/poppins/v1/VIeViZ2fPtYBt3B2fQZplvesZW2xOQ-xsNqO47m55DA.ttf","500":"http://fonts.gstatic.com/s/poppins/v1/4WGKlFyjcmCFVl8pRsgZ9vesZW2xOQ-xsNqO47m55DA.ttf","600":"http://fonts.gstatic.com/s/poppins/v1/-zOABrCWORC3lyDh-ajNnPesZW2xOQ-xsNqO47m55DA.ttf","700":"http://fonts.gstatic.com/s/poppins/v1/8JitanEsk5aDh7mDYs-fYfesZW2xOQ-xsNqO47m55DA.ttf","regular":"http://fonts.gstatic.com/s/poppins/v1/hlvAxH6aIdOjWlLzgm0jqg.ttf"},"popularity":34,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Noto Serif","category":"serif","variants":["regular","italic","700","700italic"],"subsets":["greek","cyrillic","greek-ext","latin","cyrillic-ext","latin-ext","vietnamese"],"version":"v4","lastModified":"2016-10-05","files":{"700":"http://fonts.gstatic.com/s/notoserif/v4/lJAvZoKA5NttpPc9yc6lPQJKKGfqHaYFsRG-T3ceEVo.ttf","regular":"http://fonts.gstatic.com/s/notoserif/v4/zW6mc7bC1CWw8dH0yxY8JfesZW2xOQ-xsNqO47m55DA.ttf","italic":"http://fonts.gstatic.com/s/notoserif/v4/HQXBIwLHsOJCNEQeX9kNzy3USBnSvpkopQaUR-2r7iU.ttf","700italic":"http://fonts.gstatic.com/s/notoserif/v4/Wreg0Be4tcFGM2t6VWytvED2ttfZwueP-QU272T9-k4.ttf"},"popularity":35,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Anton","category":"sans-serif","variants":["regular"],"subsets":["latin","latin-ext"],"version":"v7","lastModified":"2016-06-07","files":{"regular":"http://fonts.gstatic.com/s/anton/v7/XIbCenm-W0IRHWYIh7CGUQ.ttf"},"popularity":36,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Lobster","category":"display","variants":["regular"],"subsets":["cyrillic","latin","latin-ext","vietnamese"],"version":"v18","lastModified":"2016-05-30","files":{"regular":"http://fonts.gstatic.com/s/lobster/v18/9LpJGtNuM1D8FAZ2BkJH2Q.ttf"},"popularity":37,"loaded":false,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Yanone Kaffeesatz","category":"sans-serif","variants":["200","300","regular","700"],"subsets":["latin","latin-ext"],"version":"v7","lastModified":"2016-05-31","files":{"200":"http://fonts.gstatic.com/s/yanonekaffeesatz/v7/We_iSDqttE3etzfdfhuPRbq92v6XxU4pSv06GI0NsGc.ttf","300":"http://fonts.gstatic.com/s/yanonekaffeesatz/v7/We_iSDqttE3etzfdfhuPRZlIwXPiNoNT_wxzJ2t3mTE.ttf","700":"http://fonts.gstatic.com/s/yanonekaffeesatz/v7/We_iSDqttE3etzfdfhuPRf2R4S6PlKaGXWPfWpHpcl0.ttf","regular":"http://fonts.gstatic.com/s/yanonekaffeesatz/v7/YDAoLskQQ5MOAgvHUQCcLdXn3cHbFGWU4T2HrSN6JF4.ttf"},"popularity":38,"loaded":false,"defaultStyle":"regular"},
        // for testing variants else paths ...
        {"kind":"webfonts#webfont","family":"Bogus and Made Up Two","category":"sans-serif","variants":["italic"],"subsets":["latin"],"version":"v7","lastModified":"2020-05-31","files":{},"popularity":32,"loaded":false,"defaultStyleIsMissingHere":"regular"},
        {"kind":"webfonts#webfont","family":"Bogus and Made Up One","category":"sans-serif","variants":["100italic"],"subsets":["latin"],"version":"v7","lastModified":"2020-05-31","files":{},"popularity":32,"loaded":false,"defaultStyleIsMissingHere":"regular"},
        {"kind":"webfonts#webfont","family":"Bogus and Made Up Three","category":"sans-serif","variantsIsMissing":["italic", "300","700"],"subsets":["latin"],"version":"v7","lastModified":"2020-05-31","files":{},"popularity":32,"loaded":false,"defaultStyleIsMissingHere":"regular"},
        ]};

    beforeEach(() => {
        GoogleFonts.FontList = SampleData;
    });

    it('gets fonts by name', () => {
        let item = GoogleFonts.GetFont("PT Sans");
        expect(item.family).toEqual("PT Sans");
    });

    it('creates class name from font name', () => {
        let fontName = GoogleFonts.GetFont("Source Sans Pro").family;
        expect(GoogleFonts.ClassNameForFontName(fontName)).toEqual("font-sourcesanspro");
    });

    it('decodes FVDs', () => {
        expect(GoogleFonts.DecodeFvd()['font-weight']).toEqual("normal");
        expect(GoogleFonts.DecodeFvd('n7')['font-weight']).toEqual("bold");
        expect(GoogleFonts.DecodeFvd('i3')['font-weight']).toEqual("300");
        expect(GoogleFonts.DecodeFvd('o6')['font-style']).toEqual("oblique");
        expect(GoogleFonts.DecodeFvd('n5')['font-style']).toEqual("normal");
        expect(GoogleFonts.DecodeFvd('i2')['font-style']).toEqual("italic");
        expect(GoogleFonts.DecodeFvd('i1')['font-weight-numeric']).toEqual("100");
    });

    it('sorts fonts', () => {
        let items = GoogleFonts.FontList.items;
        GoogleFonts.SortFontList("popularity");
        expect(items[0].family).toEqual('Roboto');
        expect(items[1].family).toEqual('Open Sans');
        GoogleFonts.SortFontList("family");
        expect(items[0].family).toEqual('Anton');
        expect(items[1].family).toEqual('Arimo');
        GoogleFonts.SortFontList("lastModified");
        expect(items[0].family).toEqual('Lobster');
        expect(items[1].family).toEqual('Yanone Kaffeesatz');
    });

    it('sorts fonts (error paths)', () => {
        let oldDebug = ConsoleTab.debug;
        let oldItems = SampleData.items;

        ConsoleTab.debug = jest.fn();
        expect(ConsoleTab.debug).not.toBeCalled();
        GoogleFonts.SortFontList();
        expect(ConsoleTab.debug).toBeCalled();

        SampleData.items = [];
        ConsoleTab.debug = jest.fn();
        expect(ConsoleTab.debug).not.toBeCalled();
        GoogleFonts.SortFontList();
        expect(ConsoleTab.debug).toBeCalled();

        SampleData.items = oldItems;
        ConsoleTab.debug = oldDebug;
    });

    it('loads fonts', () => {
        let oldDebug = ConsoleTab.debug;
        let oldLoad = WebFonts.load;
        let calledLoad = false;
        WebFonts.load = jest.fn((config) => {
            config.fontloading('Roboto', 'n4');
            config.fontactive('Roboto', 'n4');
            config.fontinactive('Roboto', 'n4');
            calledLoad = true;
        });
        ConsoleTab.debug = jest.fn();

        GoogleFonts.LoadFont({family:'foo', variants: [], subsets: []});

        expect(calledLoad).toEqual(true);
        expect(ConsoleTab.debug).toBeCalled();
        WebFonts.load = oldLoad;
        ConsoleTab.debug = oldDebug;
    });

    it('fetches data', () => {
        let oldGet = $.get;
        let oldInfo = ConsoleTab.info;
        let mockGet = jest.fn((url, callback) => {
            let p = new Promise((resolve, reject) => {
                resolve();
            }).then((data) => {
                callback(SampleData);
            });
            p.fail = jest.fn(() => {});
            return p;
        });
        let mockInfo = jest.fn(() => {});
        let mockCallback = jest.fn(() => {});
        $.get = mockGet;
        ConsoleTab.info = mockInfo;

        GoogleFonts.LoadFontList(mockCallback);

        $.get = oldGet;
        ConsoleTab.info = oldInfo;
        expect(mockGet).toBeCalled();
        expect(mockInfo).toBeCalled();
        // expect(mockCallback).toBeCalled();
    });

    // it('fetches data', () => {
    //     let oldGet = $.get;
    //
    //     let mockGet = jest.fn((url, callback) => {});
    //     let mockInfo = jest.fn(() => {});
    //     let mockCallback = jest.fn(() => {});
    //
    //     mockGet.fail = jest.fn((obj) => {
    //         console.log(typeof obj);
    //         if(typeof obj === "function") {
    //             console.log('set function');
    //             mockGet.failFn = obj;
    //         } else {
    //             console.log('call function');
    //             mockGet.failFn(obj);
    //         }
    //     });
    //
    //     $.get = mockGet;
    //     ConsoleTab.info = mockInfo;
    //     GoogleFonts.LoadFontList(mockCallback);
    //     $.get.calls[0][0].success(SampleData);
    //
    //     $.get = oldGet;
    //     ConsoleTab.info = oldInfo;
    //     expect(mockGet).toBeCalled();
    //     expect(mockInfo).toBeCalled();
    //     // expect(mockCallback).toBeCalled();
    // });

    // it('calls fail function on error', () => {
    //     let oldGet = $.get;
    //     let oldInfo = ConsoleTab.info;
    //     let mockGet = jest.fn((url, callback) => {
    //         let p = new Promise((resolve, reject) => {
    //             //resolve(SampleData);
    //             //reject({responseJSON: {error: {message: "Oops!" }}});
    //             this.fail({responseJSON: {error: {message: "Oops!" }}});
    //         }).then((data) => {
    //             // callback(SampleData);
    //             this.fail(data);
    //         }).catch((data) => {
    //             this.fail(data);
    //         });
    //         p.fail = jest.fn((obj) => {
    //             console.log(typeof obj);
    //             if(typeof obj === "function") {
    //                 console.log('set fail function');
    //                 p.failFn = obj;
    //             } else {
    //                 console.log('call fail function');
    //                 p.failFn(obj);
    //             }
    //         });
    //         p.done = jest.fn((obj) => {
    //             console.log(typeof obj);
    //             if(typeof obj === "function") {
    //                 console.log('set done function');
    //                 p.doneFn = obj;
    //             } else {
    //                 console.log('call done function');
    //                 p.doneFn(obj);
    //             }
    //         });
    //         return p;
    //     });
    //     let mockInfo = jest.fn(() => {});
    //     let mockCallback = jest.fn(() => {});
    //     $.get = mockGet;
    //     ConsoleTab.info = mockInfo;
    //
    //     GoogleFonts.LoadFontList(mockCallback);
    //
    //     $.get = oldGet;
    //     ConsoleTab.info = oldInfo;
    //     expect(mockGet).toBeCalled();
    //     expect(mockInfo).toBeCalled();
    //     // expect(mockCallback).toBeCalled();
    // });
});


