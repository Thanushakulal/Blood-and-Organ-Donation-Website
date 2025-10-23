"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Lang = "en" | "hi" | "kn" | "ml"
type Dict = Record<string, string>

const DICTS: Record<Lang, Dict> = {
  en: {
    siteName: "LifeLink",
    donateHeadline: "Donate Blood & Organs. Save Lives.",
    donateSub: "Join our community-driven registry. Hospitals can reach you quickly when there's an urgent need.",
    registerNow: "Register Now",
    staffLogin: "Staff Login",
    donorRegistration: "Donor Registration",
    name: "Full Name",
    email: "Email",
    phone: "Phone Number",
    bloodGroup: "Blood Group",
    organ: "Organ",
    organs: "Organs",
    organConsent: "Organ Donation Consent",
    willingToDonateOrgans: "Willing to donate select organs",
    location: "City / Location",
    age: "Age",
    gender: "Gender",
    submit: "Submit Registration",
    staffDashboard: "Hospital Staff Dashboard",
    filters: "Filters",
    alertMessage: "Alert Message",
    subject: "Subject",
    sendAlert: "Send Alert",
    login: "Login",
    password: "Password",
    all: "All",
    benefit1Title: "Fast Response",
    benefit1Desc: "Hospitals can filter and contact eligible donors quickly.",
    benefit2Title: "Privacy First",
    benefit2Desc: "Your contact info is shared only for verified requests.",
    benefit3Title: "Community Impact",
    benefit3Desc: "Every registration increases the chance to save a life.",
    registerThanks: "Thank you! Your registration has been recorded.",
    impactTitle: "See the impact",
    impactSub: "Transparent reporting with simple metrics.",
    statPeopleServed: "people served",
    statProjects: "projects",
    statCountries: "countries",
    impactMapAlt: "Impact map preview",
    preview: "Preview",
    templateVarsLabel: "Template variables",
    fillAllFields: "Please fill all required fields",
  },
  hi: {
    siteName: "LifeLink",
    donateHeadline: "रक्त व अंग दान करें। जीवन बचाएँ।",
    donateSub: "हमारे समुदाय से जुड़ें। ज़रूरत पड़ने पर अस्पताल आपसे तुरंत संपर्क कर सकेंगे।",
    registerNow: "रजिस्टर करें",
    staffLogin: "स्टाफ लॉगिन",
    donorRegistration: "दाता पंजीकरण",
    name: "पूरा नाम",
    email: "ईमेल",
    phone: "फोन नंबर",
    bloodGroup: "ब्लड ग्रुप",
    organ: "अंग",
    organs: "अंग",
    organConsent: "अंग दान सहमति",
    willingToDonateOrgans: "चयनित अंग दान के इच्छुक",
    location: "शहर/स्थान",
    age: "आयु",
    gender: "लिंग",
    submit: "पंजीकरण जमा करें",
    staffDashboard: "अस्पताल स्टाफ डैशबोर्ड",
    filters: "फ़िल्टर",
    alertMessage: "अलर्ट संदेश",
    subject: "विषय",
    sendAlert: "अलर्ट भेजें",
    login: "लॉगिन",
    password: "पासवर्ड",
    all: "सभी",
    benefit1Title: "तेज़ प्रतिक्रिया",
    benefit1Desc: "अस्पताल योग्य दाताओं को जल्दी फ़िल्टर कर संपर्क कर सकते हैं।",
    benefit2Title: "गोपनीयता पहले",
    benefit2Desc: "आपकी जानकारी केवल सत्यापित अनुरोधों के लिए उपयोग होती है।",
    benefit3Title: "समुदाय प्रभाव",
    benefit3Desc: "हर पंजीकरण जीवन बचाने की संभावना बढ़ाता है।",
    registerThanks: "धन्यवाद! आपका पंजीकरण दर्ज हो गया है।",
    impactTitle: "प्रभाव देखें",
    impactSub: "सरल मेट्रिक्स के साथ पारदर्शी रिपोर्टिंग.",
    statPeopleServed: "लोगों की सेवा",
    statProjects: "परियोजनाएँ",
    statCountries: "देश",
    impactMapAlt: "प्रभाव मानचित्र पूर्वावलोकन",
    preview: "पूर्वावलोकन",
    templateVarsLabel: "टेम्पलेट वेरिएबल्स",
    fillAllFields: "कृपया सभी आवश्यक फ़ील्ड भरें",
  },
  kn: {
    siteName: "LifeLink",
    donateHeadline: "ರಕ್ತ ಮತ್ತು ಅಂಗ ದಾನ ಮಾಡಿ. ಜೀವಗಳನ್ನು ಉಳಿಸಿ.",
    donateSub: "ನಮ್ಮ ಸಮುದಾಯ ರಿಜಿಸ್ಟ್ರಿಯಲ್ಲಿ ಸೇರಿ. ತುರ್ತು ಅವಶ್ಯಕತೆಯಲ್ಲಿ ಆಸ್ಪತ್ರೆಗಳು ನಿಮಗೆ ಬೇಗ ಸಂಪರ್ಕಿಸಬಹುದು.",
    registerNow: "ಇಗೇ ನೋಂದಾಯಿಸಿ",
    staffLogin: "ಸಿಬ್ಬಂದಿ ಲಾಗಿನ್",
    donorRegistration: "ದಾತರ ನೋಂದಣಿ",
    name: "ಪೂರ್ಣ ಹೆಸರು",
    email: "ಇಮೇಲ್",
    phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
    bloodGroup: "ರಕ್ತಗುಂಪು",
    organ: "ಅಂಗ",
    organs: "ಅಂಗಗಳು",
    organConsent: "ಅಂಗ ದಾನದ ಒಪ್ಪಿಗೆ",
    willingToDonateOrgans: "ಆಯ್ಕೆ ಮಾಡಿದ ಅಂಗಗಳನ್ನು ದಾನ ಮಾಡಲು ಸಿದ್ಧ",
    location: "ನಗರ / ಸ್ಥಳ",
    age: "ವಯಸ್ಸು",
    gender: "ಲಿಂಗ",
    submit: "ನೋಂದಣಿ ಸಲ್ಲಿಸಿ",
    staffDashboard: "ಆಸ್ಪತ್ರೆ ಸಿಬ್ಬಂದಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    filters: "ಫಿಲ್ಟರ್‌ಗಳು",
    alertMessage: "ಅಲರ್ಟ್ ಸಂದೇಶ",
    subject: "ವಿಷಯ",
    sendAlert: "ಅಲರ್ಟ್ ಕಳುಹಿಸಿ",
    login: "ಲಾಗಿನ್",
    password: "ಪಾಸ್ವರ್ಡ್",
    all: "ಎಲ್ಲ",
    benefit1Title: "ತ್ವರಿತ ಪ್ರತಿಕ್ರಿಯೆ",
    benefit1Desc: "ಆಸ್ಪತ್ರೆಗಳು ಅರ್ಹ ದಾತರನ್ನು ಬೇಗ ಫಿಲ್ಟರ್ ಮಾಡಿ ಸಂಪರ್ಕಿಸಬಹುದು.",
    benefit2Title: "ಗೌಪ್ಯತೆ ಮೊದಲ",
    benefit2Desc: "ನಿಮ್ಮ ಮಾಹಿತಿ ಪರಿಶೀಲಿತ ವಿನಂತಿಗಳಿಗೆ ಮಾತ್ರ ಹಂಚಲಾಗುತ್ತದೆ.",
    benefit3Title: "ಸಮುದಾಯ ಪ್ರಭಾವ",
    benefit3Desc: "ಪ್ರತಿ ನೋಂದಣಿ ಜೀವ ಉಳಿಸುವ ಅವಕಾಶವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.",
    registerThanks: "ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ನೋಂದಣಿ ದಾಖಲಾಗಿದೆ.",
    impactTitle: "ಪ್ರಭಾವವನ್ನು ನೋಡಿ",
    impactSub: "ಸರಳ ಮೆಟ್ರಿಕ್‌ಗಳೊಂದಿಗೆ ಪಾರದರ್ಶಕ ವರದಿ.",
    statPeopleServed: "ಜನರಿಗೆ ಸೇವೆ",
    statProjects: "ಯೋಜನೆಗಳು",
    statCountries: "ದೆಶಗಳು",
    impactMapAlt: "ಪ್ರಭಾವ ನಕ್ಷೆ ಪೂರ್ವದೃಶ್ಯ",
    preview: "ಪೂರ್ವದೃಶ್ಯ",
    templateVarsLabel: "ಟೆಂಪ್ಲೇಟ್ ಚರಗಳು",
    fillAllFields: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ",
  },
  ml: {
    siteName: "LifeLink",
    donateHeadline: "രക്തവും അവയവങ്ങളും ദാനം ചെയ്യുക. ജീവൻ രക്ഷിക്കുക.",
    donateSub: "ഞങ്ങളുടെ കമ്മ്യൂണിറ്റി രജിസ്ട്രിയിൽ ചേരുക. അത്യാവശ്യത്തിൽ ആശുപത്രികൾ വേഗത്തിൽ ബന്ധപ്പെടും.",
    registerNow: "ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യുക",
    staffLogin: "സ്റ്റാഫ് ലോഗിൻ",
    donorRegistration: "ദാതാവിന്റെ രജിസ്ട്രേഷൻ",
    name: "പൂർണ്ണ പേര്",
    email: "ഇമെയിൽ",
    phone: "ഫോൺ നമ്പർ",
    bloodGroup: "രക്തഗ്രൂപ്പ്",
    organ: "അവയവം",
    organs: "അവയവങ്ങൾ",
    organConsent: "അവയവ ദാന സമ്മതം",
    willingToDonateOrgans: "തിരഞ്ഞെടുത്ത അവയവങ്ങൾ ദാനം ചെയ്യാൻ തയ്യാറാണ്",
    location: "നഗരം / സ്ഥലം",
    age: "പ്രായം",
    gender: "ലിംഗം",
    submit: "രജിസ്ട്രേഷൻ സമർപ്പിക്കുക",
    staffDashboard: "ആശുപത്രി സ്റ്റാഫ് ഡാഷ്ബോർഡ്",
    filters: "ഫിൽട്ടറുകൾ",
    alertMessage: "അലർട്ട് സന്ദേശം",
    subject: "വിഷയം",
    sendAlert: "അലർട്ട് അയയ്ക്കുക",
    login: "ലോഗിൻ",
    password: "പാസ്‌വേഡ്",
    all: "എല്ലാം",
    benefit1Title: "വേഗത്തിലുള്ള പ്രതികരണം",
    benefit1Desc: "ആശുപത്രികൾ യോഗ്യരായ ദാതാക്കളെ വേഗത്തിൽ കണ്ടെത്തി ബന്ധപ്പെടാം.",
    benefit2Title: "സ്വകാര്യത മുൻപ്",
    benefit2Desc: "താങ്കളുടെ വിവരങ്ങൾ സ്ഥിരീകരിച്ച അഭ്യർത്ഥനകൾക്കായി മാത്രം പങ്കിടുന്നു.",
    benefit3Title: "സമൂഹ സ്വാധീനം",
    benefit3Desc: "ഓരോ രജിസ്ട്രേഷനും ജീവൻ രക്ഷിക്കാനുള്ള സാധ്യത വർദ്ധിപ്പിക്കുന്നു.",
    registerThanks: "നന്ദി! നിങ്ങളുടെ രജിസ്ട്രേഷൻ രേഖപ്പെടുത്തി.",
    impactTitle: "പ്രഭാവം കാണുക",
    impactSub: "ലളിതമായ മെട്രിക്കുകളോടെ സുതാര്യമായ റിപ്പോർട്ടിംഗ്.",
    statPeopleServed: "സേവനം ലഭിച്ചവർ",
    statProjects: "പ്രോജക്റ്റുകൾ",
    statCountries: "രാജ്യങ്ങൾ",
    impactMapAlt: "പ്രഭാവ മാപ്പ് പ്രിവ്യൂ",
    preview: "പ്രിവ്യൂ",
    templateVarsLabel: "ടെംപ്ലേറ്റ് വാരിയബിളുകൾ",
    fillAllFields: "ദയവായി എല്ലാ ആവശ്യമായ ഫീൽഡുകൾ പൂരിപ്പിക്കുക",
  },
}

type I18nContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null
    if (saved) setLang(saved)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang)
      document.documentElement.lang = lang
      document.documentElement.dir = "ltr"
    }
  }, [lang])

  const t = useMemo(() => {
    const dict = DICTS[lang]
    return (key: string) => dict[key] ?? DICTS.en[key] ?? key
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
