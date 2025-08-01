const IMAGES = {
  LOGO: require("@/assets/logo.png"),
  BANNER: require("@/assets/banner.jpg"),
  MAINBANNER: require("@/assets/main-banner.png"),
  TOP: require("@/assets/top.png"),
  TOP1: require("@/assets/top-1.png"),
  TOPBANNER: require("@/assets/banner-right-top.png"),
  BOTTOMBANNER: require("@/assets/banner-right-bottom.png"),
  GOOGLEPAY: require("@/assets/payment/google-pay.png"),
  MASTERCARD: require("@/assets/payment/mastercard.png"),
  VISA: require("@/assets/payment/visa.png"),
  RUPAY: require("@/assets/payment/rupay.png"),
  APPSTORE: require("@/assets/app/app-store.png"),
  APPGOOGLEPAY: require("@/assets/app/google-pay.png"),
  // Shop Category
  CANCERCARE: require("@/assets/shopcategory/cancer-care.png"),
  ELDERCARE: require("@/assets/shopcategory/elder-care.png"),
  SPECIALCARE: require("@/assets/shopcategory/special-care.png"),
  HEALTHCARE: require("@/assets/shopcategory/health-care.png"),
  HEALTHDEVICECARE: require("@/assets/shopcategory/health-device-care.png"),
  BEAUTYCARE: require("@/assets/shopcategory/beauty-care.png"),
  AYURVEDIC: require("@/assets/ayurvedic.png"),
  // Banner Group
  AROMA: require("@/assets/offers/aroma.png"),
  LABTEST1: require("@/assets/offers/labtest.png"),
  HEALTHCAREBANNER: require("@/assets/offers/healthcare.png"),
  AYURVEDICBANNER: require("@/assets/offers/ayurvedic.png"),
  SPECIALCAREBANNER: require("@/assets/offers/specialcare.png"),
  EYECAREBANNER: require("@/assets/offers/eyecare.png"),
  // Our Service and Care
  SHIPPING: require("@/assets/shopcategory/shipping.png"),
  CUSTOMER: require("@/assets/shopcategory/customer-care.png"),
  ANTHROPOLOGY: require("@/assets/shopcategory/anthropology.png"),
  DRUGSTORE: require("@/assets/shopcategory/drugstore.png"),
  EMERGENCY: require("@/assets/shopcategory/emergency-call.png"),
  // Featured Care & Package
  SEASONAL: require("@/assets/featured/seasonal.png"),
  LABPACKAGE: require("@/assets/featured/lab-package.png"),
  CLINICCARE: require("@/assets/featured/clinic-care.png"),
  BABYCARE1: require("@/assets/featured/baby-care.png"),
  DRUGCARTS: require("@/assets/featured/drugcarts.png"),
  SPECIALFCARE: require("@/assets/featured/special-care.png"),
  TESTKIT: require("@/assets/featured/test-kit.png"),
  WOMEN: require("@/assets/featured/women.png"),
  // Health Hacks
  HACKS1: require("@/assets/hacks/hacks-1.jpg"),
  HACKS2: require("@/assets/hacks/hacks-2.jpg"),
  HACKS3: require("@/assets/hacks/hacks-3.jpg"),
  // Shop by Category
  FACECARE1: require("@/assets/shopbycategory/face-care.png"),
  ORALCARE: require("@/assets/shopbycategory/oral-care.png"),
  NATURALCARE: require("@/assets/shopbycategory/natural-care.png"),
  SKINCARE1: require("@/assets/shopbycategory/skin-care.png"),
  GENERIC1: require("@/assets/shopbycategory/generic-1.png"),
  GENERIC2: require("@/assets/shopbycategory/generic-2.png"),
  NEW: require("@/assets/shopbycategory/new.png"),
  BESTSELLER: require("@/assets/shopbycategory/best-seller.png"),
  DISCOUNT: require("@/assets/shopbycategory/discount.png"),
  TRANDING: require("@/assets/shopbycategory/tranding.png"),
  HERBAL: require("@/assets/shopbycategory/herbal.png"),
  Product_Eugebra: require("@/assets/product/eugebra.png"),
  ALOVERA: require("@/assets/product/alovera.png"),
  HONITUS: require("@/assets/product/honitus.png"),
  // Icons
  DESCICON: require("@/assets/Icons/description.png"),
  USES: require("@/assets/Icons/uses.png"),
  BENEFITS: require("@/assets/Icons/benefits.png"),
  INDICATION: require("@/assets/Icons/indication.png"),
  MECHANISM: require("@/assets/Icons/mechanism.png"),
  FAQS: require("@/assets/Icons/faqs.png"),
  SIDEEFFECTS: require("@/assets/Icons/side-effects.png"),
  SIDEEFFECT1: require("@/assets/Icons/side-effect-1.png"),
  SIDEEFFECT2: require("@/assets/Icons/side-effect-2.png"),
  SIDEEFFECT3: require("@/assets/Icons/side-effect-3.png"),
  AUTHOR: require("@/assets/Icons/author.jpg"),
  DATE: require("@/assets/Icons/date.png"),
  TIME: require("@/assets/Icons/time.png"),
  THUMBSUP: require("@/assets/Icons/thumbs-up.png"),
  THUMBSDOWN: require("@/assets/Icons/thumbs-down.png"),
  ANTICANCER: require("@/assets/Icons/cancer.png"),
  ARTHRITIS: require("@/assets/Icons/arthritis-healthcare.jpg"),
  ANTIBIOTIC: require("@/assets/Icons/anti-biotic.png"),
  ASTHMA: require("@/assets/Icons/asthma.jpg"),
  GASTRO: require("@/assets/Icons/Gastro.jpg"),
  CARDIO: require("@/assets/Icons/cardio.jpg"),
  NEPHROLOGY: require("@/assets/Icons/nephrology.jpg"),
  KIDNEY: require("@/assets/Icons/kidney.jpg"),
  HYPERTENSION: require("@/assets/Icons/hypertension.jpg"),
  HEPATITIS: require("@/assets/Icons/hepatitis.jpg"),
  NURSE: require("@/assets/Icons/nurses.png"),
  PHYSIO: require("@/assets/Icons/physiotherapy.png"),
  DIETICIAN: require("@/assets/Icons/dietician.png"),
  ELDER: require("@/assets/Icons/elder.png"),
  ORTHOPEDIC: require("@/assets/Icons/orthopedic.png"),
  GLUCOMETER: require("@/assets/Icons/glucometer.png"),
  VACCINATION: require("@/assets/Icons/vaccination.png"),
  COVID: require("@/assets/Icons/covid.png"),
  CANCER: require("@/assets/Icons/cancer-care.png"),
  NATURALFOOD: require("@/assets/Icons/natural-food.png"),
  ONLINEDOCTOR: require("@/assets/Icons/online-doctor.png"),
  LABTEST: require("@/assets/Icons/lab-test.png"),
  PETCTSCAN: require("@/assets/Icons/pet-ct-scan.jpg"),
  CTSCAN: require("@/assets/Icons/ct-scan.jpg"),
  MRISCAN: require("@/assets/Icons/mri-scan.jpg"),
  USGSCAN: require("@/assets/Icons/usg-scan.jpg"),
  XRAY: require("@/assets/Icons/x-ray.jpg"),
  STRESSTEST: require("@/assets/Icons/stress-test.jpg"),
  ECGTEST: require("@/assets/Icons/ecg-test.jpg"),
  BLOODPRESSURE: require("@/assets/Icons/blood-pressure.png"),
  BLOODTEST: require("@/assets/Icons/blood-test.png"),
  COVIDTEST: require("@/assets/Icons/covid-test.png"),
  HIV: require("@/assets/Icons/hiv.png"),
  PREGNANCY: require("@/assets/Icons/pregnancy.png"),
  PULSE: require("@/assets/Icons/pulse.png"),
  NEBULIZER: require("@/assets/Icons/nebulizer.png"),
  MEDICINE: require("@/assets/Icons/medicine.png"),
  PRESCRIPTION: require("@/assets/Icons/prescription.png"),
  DIABETESLABTEST: require("@/assets/Icons/diabetes-lab-test.png"),
  HEMOGRAMLABTEST: require("@/assets/Icons/hemogram-lab-test.png"),
  THYROIDLABTEST: require("@/assets/Icons/thyroid-lab-test.png"),
  LIPIDLABTEST: require("@/assets/Icons/lipid-lab-test.png"),
  ALLERGIC: require("@/assets/Icons/allergic-condition.jpg"),
  PAINRELIFER: require("@/assets/Icons/pain-reliver.jpg"),
  FEVER: require("@/assets/Icons/fever.jpg"),
  HELP: require("@/assets/Icons/help.png"),
  AYUSH: require("@/assets/Icons/ayush.png"),
  SIDDHA: require("@/assets/Icons/siddha.png"),
  UNANI: require("@/assets/Icons/unani.png"),
  HOMEOPATHY: require("@/assets/Icons/homeopathy.png"),
  BABYCARE: require("@/assets/Icons/baby-care.png"),
  FACECARE: require("@/assets/Icons/face-care.png"),
  FRAGRANCES: require("@/assets/Icons/fragrances.png"),
  HAIRCARE: require("@/assets/Icons/hair-care.png"),
  HOMECARE: require("@/assets/Icons/home-care.png"),
  SKINCARE: require("@/assets/Icons/skin-care.png"),
  WOMENCARE: require("@/assets/Icons/women-care.png"),
  PERSONALCARE: require("@/assets/Icons/personal-care.png"),
  SUPPLEMENTS: require("@/assets/Icons/supplements.png"),
  HEALTHCARE: require("@/assets/Icons/health-care.png"),
  NURSECARE: require("@/assets/Icons/nurse-care.png"),
  ELDERCARE: require("@/assets/Icons/elder-care.png"),
  DIAGNOSTIC: require("@/assets/Icons/diagnostic.png"),
  DOCTOR: require("@/assets/Icons/doctor.png"),
  MEDICAL: require("@/assets/Icons/medical.png"),
  AYURVEDIC: require("@/assets/Icons/ayurvedic.png"),
  NUTRITION: require("@/assets/Icons/nutrition.png"),
  HEALTHFOOD: require("@/assets/Icons/health-food.png"),
  ORGANIC: require("@/assets/Icons/organic.png"),
  SMOKING: require("@/assets/Icons/smoking.png"),
  VITAMINS: require("@/assets/Icons/vitamins.png"),
  WEIGHT: require("@/assets/Icons/weight.png"),
  SKINTREATMENT: require("@/assets/Icons/skin-treatment.png"),
  COUGHCOLD: require("@/assets/Icons/cough-cold.png"),
  STOMACH: require("@/assets/Icons/stomach.png"),
  PROTEIN: require("@/assets/Icons/protein.png"),
  PROTEIN: require("@/assets/Icons/protein.png"),
  HANDSANITIZER: require("@/assets/Icons/hand-sanitizer.png"),
  MENCARE: require("@/assets/Icons/men-care.png"),
  CERTIFICATE: require("@/assets/Icons/certificate.png"),
  MONEY: require("@/assets/Icons/money.png"),
  DELIVERY: require("@/assets/Icons/delivery.png"),
  TURMERIC: require("@/assets/Icons/turmeric.png"),
  ALCOHOL: require("@/assets/Icons/alcohol.png"),
  DRIVING: require("@/assets/Icons/driving.png"),
  PREGNANCYWOMEN: require("@/assets/Icons/pregnancy-women.png"),
  BREASTFEEDING: require("@/assets/Icons/breast-feeding.png"),
  KIDNEY1: require("@/assets/Icons/kidney-1.png"),
  LIVER: require("@/assets/Icons/liver.png"),
  PILL: require("@/assets/Icons/pill.png"),
  ADULT: require("@/assets/Icons/adult.png"),
  CHILD: require("@/assets/Icons/child.png"),
  PATIENT: require("@/assets/Icons/patient.png"),
  INSTRUCTION: require("@/assets/Icons/instruction.png"),
  INTERACTION: require("@/assets/Icons/interaction.png"),
  DRUGINTERACTION: require("@/assets/Icons/drug-interaction.jpg"),
  DRUGFOOD: require("@/assets/Icons/drug-food.png"),
  DRUGDISEASE: require("@/assets/Icons/drug-disease.png"),
  DOSE: require("@/assets/Icons/dose.png"),
  MISSEDDOSE: require("@/assets/Icons/missed-dose.png"),
  STORAGE: require("@/assets/Icons/storage.png"),
  FASTTAG: require("@/assets/Icons/fast-tag.png"),
  REFERENCE: require("@/assets/Icons/reference.png"),
  EXPIRED: require("@/assets/Icons/expired.png"),
  DISCLAIMER: require("@/assets/Icons/disclaimer.png"),
  EUGEBRAL: require("@/assets/Icons/eugebra-l.png"),
  SHOP: require("@/assets/Icons/shop.png"),
  LOCATION: require("@/assets/Icons/location.png"),
  NO_IMAGE: require("@/assets/product/no_image.png"),

  // Social Media
  WHATSAPP: require("@/assets/social/whatsapp.png"),
  FACEBOOK: require("@/assets/social/facebook.png"),
  INSTAGRAM: require("@/assets/social/instagram.png"),
  PINTEREST: require("@/assets/social/pinterest.png"),
  LINKEDIN: require("@/assets/social/linkedin.png"),
  TELEGRAM: require("@/assets/social/telegram.png"),
  TWITTER: require("@/assets/social/twitter.png"),
  VIMEO: require("@/assets/social/vimeo.png"),
  YOUTUBE: require("@/assets/social/youtube.png"),
  // prescription upload
  PRESCRIPTIONFORMAT: require("@/assets/prescription-format.png"),
  PRESCRIPTIONICON: require("@/assets/prescriptionicons.png"),
  PRESCRIPTIONSAVE: require("@/assets/saveprescription.png"),
  DELIVERYADDRESS: require("@/assets/delivery-address-image.png"),
  SUCCESS: require("@/assets/success.png"),

  // blog
  BLOGBANNER: require("@/assets/blog/blog-banner1.png"),
  BLOGIMAGE: require("@/assets/blog/blogmedicine.png"),
  DUMMYIMAGE: require("@/assets/dummyimage.png"),

  // lab test
  LAB_ICON: require("@/assets/lab-test/lab_icon.png"),
  DISCOUNT: require("@/assets/lab-test/discount.png"),
  DIABETES: require("@/assets/lab-test/Diabetes.png"),
  COMPLETE: require("@/assets/lab-test/Complete.png"),
  THYROID: require("@/assets/lab-test/Thyroid.png"),
  LIPID: require("@/assets/lab-test/Lipid.png"),
  LIVER: require("@/assets/lab-test/Liver.png"),
  KIDNEY: require("@/assets/lab-test/Kidney.png"),
  VITAMIN: require("@/assets/lab-test/Vitamin.png"),
  INFECTION: require("@/assets/lab-test/Infection.png"),

  //Ayush
  AYUSHBANNER: require("@/assets/ayush/ayush.png"),
  AYURVEDICBNNR: require("@/assets/ayush/ayurvedic.png"),
  HOMEOPATHYBANNER: require("@/assets/ayush/homeopathy.png"),
  SIDDHABANNER: require("@/assets/ayush/siddha.png"),
  UNANIBANNER: require("@/assets/ayush/unani.png"),

  //Footer
  EPILEPSY: require("@/assets/footer/Epilepsy.jpg"),
  ABOUTUS: require("@/assets/common/about-us.png"),
  ABOUTUSCHECKMEDINE: require("@/assets/common/about-us.jpg"),
  VISSION: require("@/assets/common/vission.png"),
  RESOLUTION: require("@/assets/common/resolution.png"),
  MISSION: require("@/assets/common/mission.png"),
  NEEDHELP: require("@/assets/common/needhelp.png"),
  NEEDHELPDRUG: require("@/assets/common/needhelp-drugcarts.png"),
  PRIVACYPOLICY: require("@/assets/common/privacy-policy.png"),
  CONTACTUS24: require("@/assets/common/contactus-24.png"),
  ARTICLES: require("@/assets/common/articles.png"),
  TURMERIC: require("@/assets/common/tumeric.png"),
  HEALTHTIPS: require("@/assets/common/health-tips.jpg"),
  HEALTHTIPSBANNER: require("@/assets/common/health-tips-banner.png"),
  HEALTHSTOREBAN: require("@/assets/common/healthstoreban.png"),
  HEALTHNEWS: require("@/assets/common/health-news.jpg"),
  HEALTHNEWSBANNER: require("@/assets/common/health-news-banner.jpg"),
  HERBSBANNER: require("@/assets/common/herbs-banner.jpg"),
  DISEASES: require("@/assets/common/diseases.jpg"),
  DISEASESBANNER: require("@/assets/common/diseases-banner.jpg"),
  MEDICINEPRESCRIPTION: require("@/assets/common/medicine-prescription.png"),
  UPLOADICONS: require("@/assets/common/upload-icons.png"),
  CALLICONS: require("@/assets/common/call-icons.png"),
  DELIVERYICONS: require("@/assets/common/delivery-icons.png"),
  RXPRESCRIPTION: require("@/assets/common/rx-prescription.png"),
  POLICY: require("@/assets/common/policy.png"),
  CANCELLATION: require("@/assets/common/cancellation.png"),
  EDITORIAL: require("@/assets/common/editorial.png"),
  INTELLECTUAL: require("@/assets/common/intellectual-drugcarts.png"),
  EDITORIALBANNER: require("@/assets/common/editorial-drugcart.png"),
  PROMOTION: require("@/assets/common/promotion.jpeg"),

  // Lab Test
  LABBANNER: require("@/assets/lab-test/lab-banner.png"),
  CLINICCORNER1: require("@/assets/lab-test/clinic-corner-1.png"),
  CLINICCORNER2: require("@/assets/lab-test/clinic-corner-2.png"),
  CLINICCORNER3: require("@/assets/lab-test/clinic-corner-3.png"),
  CLINICCORNER4: require("@/assets/lab-test/clinic-corner-4.png"),
  DIABETESICON: require("@/assets/lab-test/Diabetes-icon.png"),
  HEMOGRAMICON: require("@/assets/lab-test/hemogram-icon.png"),
  THYROIDICON: require("@/assets/lab-test/thyroid-icon.png"),
  LIPIDICON: require("@/assets/lab-test/lipid-icon.png"),
  LIVERICON: require("@/assets/lab-test/liver-icon.png"),
  KIDNEYICON: require("@/assets/lab-test/kidney-icon.png"),
  VITAMINICON: require("@/assets/lab-test/vitamin-icon.png"),

  // Services
  PHYSIOTHERAPISTBANNER: require("@/assets/services/physiotherapist-banner.png"),
  PHYSIOTHERAPISTBANNER1: require("@/assets/services/physiotherapist-banner1.jpg"),
  INJURYICON: require("@/assets/services/icons8-injury-100.png"),
  PREGNANCYICON: require("@/assets/services/icons8-pregnancy-100.png"),
  SURGEONSKIN: require("@/assets/services/icons8-surgeon-skin.png"),
  WHEELCHAIR: require("@/assets/services/icons8-wheelchair-100.png"),
  BACKPAIN: require("@/assets/services/icons8-back-pain.png"),
  PHYSICALTHERAPY: require("@/assets/services/icons8-physical-therapy-100.png"),
  PAINPOINTS: require("@/assets/services/icons8-pain-points-90.png"),
  LUNGDISEASE: require("@/assets/services/icons8-lung-disease-64.png"),
  SOFTTISSUE: require("@/assets/services/soft-tissue-mobilization.jpg"),
  MOBILIZATION2: require("@/assets/services/soft-tissue-mobilization2.jpg"),
  EXERCISES: require("@/assets/services/stretching-exercises.jpg"),
  IMBALANCE: require("@/assets/services/imbalance.jpg"),
  COLDTHERAPY: require("@/assets/services/cold-therapy.jpg"),
  ACCUPUNCTURE: require("@/assets/services/accupuncture.jpg"),
  COVIDBANNER: require("@/assets/services/covidbanner.jpg"),
  ISOLA1: require("@/assets/services/isola1.png"),
  ARMOR: require("@/assets/services/armour.png"),
  COVIDTEST: require("@/assets/services/test1.png"),
  COVIDBANNER1: require("@/assets/services/covid1-banner-drugcarts.jpg"),
  COVIDBANNER2: require("@/assets/services/covid2.jpg"),
  COVIDBANNER3: require("@/assets/services/covid3.jpg"),
  COVIDBANNER5: require("@/assets/services/covid5.jpg"),
  COVIDBANNER4: require("@/assets/services/covid4.jpg"),
  ELDERCAREBANNER: require("@/assets/services/eldercarebanner.jpg"),
  ELDER1: require("@/assets/services/elder1.jpg"),
  ELDER3: require("@/assets/services/elder3.jpg"),
  ELDER2: require("@/assets/services/elder2.jpg"),
  COVIDDRUGCARTS: require("@/assets/services/covidbanner-drugcarts.jpg"),
  NURSINGBANNER: require("@/assets/services/nursing-banner-drugcart.png"),
  NURSETYPES: require("@/assets/services/nursetypes.jpg"),
  NURSETYPES1: require("@/assets/services/nursetype1.jpg"),
  NURSING1: require("@/assets/services/nursing1.jpg"),
  DRESSINGCARE: require("@/assets/services/dressingcare.png"),
  INTENSTIVECARE: require("@/assets/services/intenstivecare.png"),
  INJECTIONS: require("@/assets/services/injectionsathome.png"),
  NASITUBE: require("@/assets/services/nasitube.png"),
  URINACAPABLE: require("@/assets/services/urinacapable.png"),
  TRACHEOSTOMY: require("@/assets/services/tracheostomy.png"),
  NURSEE: require("@/assets/services/Nurse.png"),
  VITALSMONTTING: require("@/assets/services/vitalsmontting.png"),
  URINAECAPA: require("@/assets/services/urinaecapa.png"),
  NURSEE1: require("@/assets/services/Nursee1.png"),
  OXYGEN: require("@/assets/services/oxygen.png"),
  INJECTIONSS: require("@/assets/services/injectionss.png"),
  DAYSHIFT: require("@/assets/services/day-shift.png"),
  NIGHTSHIFT: require("@/assets/services/night-shift.png"),
  LIVEIN: require("@/assets/services/live-in.png"),
  FITNESSBANNER: require("@/assets/services/fitnessbanner.jpg"),
  FITNESS1: require("@/assets/services/fitness1.jpg"),
  FITNESS2: require("@/assets/services/fitness2.jpg"),
  YOGABANNER: require("@/assets/services/yogabanner.jpg"),
  YOGA1: require("@/assets/services/yoga1.jpg"),
  YOGA2: require("@/assets/services/yoga2.jpg"),
  YOGA3: require("@/assets/services/yoga3.jpg"),
  YOGA4: require("@/assets/services/yoga4.jpg"),
  YOGA5: require("@/assets/services/yoga5.jpg"),
  DIET1: require("@/assets/services/diet1.jpg"),
  DIET2: require("@/assets/services/diet2.jpg"),
  DIET3: require("@/assets/services/diet3.jpg"),
  DIET4: require("@/assets/services/diet4.jpg"),
  DIET5: require("@/assets/services/diet5.jpg"),
  DIET6: require("@/assets/services/diet6.jpg"),
  DIETICIANBANNER: require("@/assets/services/dietician-banner.jpg"),
  NUTRITIONIST1: require("@/assets/services/nutritionist1.jpg"),
  NUTRITIONIST2: require("@/assets/services/nutritionist2.jpg"),
  NUTRITIONIST3: require("@/assets/services/nutritionist3.jpg"),
  NUTRITIONIST4: require("@/assets/services/nutritionist4.jpg"),
  NUTRITIONISTBANNER: require("@/assets/services/nutritionists-banner.jpg"),
  CRITICALCAREBANNER: require("@/assets/services/criticalcare.jpg"),
  CRITICAL1: require("@/assets/services/critical1.jpg"),
  CRITICAL2: require("@/assets/services/critical2.jpg"),
  POSTOPERBANNER: require("@/assets/services/postoperbanner.jpg"),
  POSTOPER1: require("@/assets/services/postoper1.jpg"),
  POSTOPER2: require("@/assets/services/postoper2.jpg"),
  SANITIZATION: require("@/assets/services/sanitization2.jpg"),
  SPEECH1: require("@/assets/services/speech1.jpg"),
  SPEECH2: require("@/assets/services/speech2.jpg"),
  SPEECH3: require("@/assets/services/speech3.jpg"),
  SPEECH4: require("@/assets/services/speech4.jpg"),
  NURSINGBANNER1: require("@/assets/services/nursingbanner.png"),
  CANCERBANNER: require("@/assets/services/cancerbanner.jpg"),
  CANCER1: require("@/assets/services/cancer1.jpg"),
  CANCER2: require("@/assets/services/cancer2.jpg"),
  CANCER3: require("@/assets/services/cancer3.jpg"),
  CANCER4: require("@/assets/services/cancer4.jpg"),
  NEWBORNBANNER: require("@/assets/services/newbornbanner.jpg"),
  NEWBORN1: require("@/assets/services/newborn1.jpg"),
  NEWBORN2: require("@/assets/services/newborn2.jpg"),
  NEWBORN3: require("@/assets/services/newborn3.jpg"),
  EQUIPMENTBANNER: require("@/assets/services/equipmentbanner.jpg"),
  MEDICAL1: require("@/assets/services/medical1.jpg"),
  MEDICAL2: require("@/assets/services/medical2.jpg"),
  MEDICAL3: require("@/assets/services/medical3.jpg"),
  MEDICAL4: require("@/assets/services/medical4.jpg"),

  MEDICALATTENDBANNER: require("@/assets/services/medicalattbanner.jpg"),
  MEDICALATTEND1: require("@/assets/services/medicalatt1.jpg"),
  MEDICALATTEND2: require("@/assets/services/medicalatt2.jpg"),
  SANITIZATIONBANNER: require("@/assets/services/sanitizationbanner.jpg"),
  SANITIZATION1: require("@/assets/services/santiz1.jpg"),
  SANITIZATION3: require("@/assets/services/sanitization3.jpg"),
  SANITIZATION2: require("@/assets/services/santiz2.jpg"),
  SANITIZATION3: require("@/assets/services/santiz3.jpg"),
  SANITIZATION4: require("@/assets/services/santiz4.jpg"),
  VACCINATIONBANNER: require("@/assets/services/vaccinationbanner.jpg"),
  VACCINATION1: require("@/assets/services/vaccination1.jpg"),
  VACCINATION2: require("@/assets/services/vaccination2.jpg"),
  VACCINATION3: require("@/assets/services/vaccination3.jpg"),
  COUNSELLINGBANNER: require("@/assets/services/counsellingbanner.jpg"),
  COUNSELLING1: require("@/assets/services/counselling1.jpg"),
  COUNSELLING2: require("@/assets/services/counselling2.jpg"),
  COUNSELLING3: require("@/assets/services/counselling3.jpg"),
  COUNSELLING4: require("@/assets/services/counselling4.jpg"),
  COUNSELLING5: require("@/assets/services/counselling5.jpg"),
  LONGTERMBANNER: require("@/assets/services/longtermbanner.jpg"),
  LONGTERM1: require("@/assets/services/longterm1.jpg"),
  LONGTERM2: require("@/assets/services/longterm2.jpg"),
  ORTHOPADICBANNER: require("@/assets/services/orthopadicbanner.jpg"),
  ORTHOPADIC1: require("@/assets/services/orthopadic1.jpg"),
  ORTHOPADIC2: require("@/assets/services/orthopadic2.jpg"),

  // scan
  SCANBANNER: require("@/assets/scan/scanbanner.jpg"),
  CTSCAN: require("@/assets/scan/ctscan.jpg"),
  CTSCAN1: require("@/assets/scan/ctscan1.jpg"),
  MRI: require("@/assets/scan/mri.jpg"),
  USG: require("@/assets/scan/usg.jpg"),
  XRAY: require("@/assets/scan/xray.jpg"),
  STRESS: require("@/assets/scan/streess.jpg"),
  ECG: require("@/assets/scan/ecg.jpg"),
  ONLINEDOCTOR: require("@/assets/scan/online-doctor.png"),
  CONSULTATION: require("@/assets/scan/consultation.png"),
  DIALYCONSULTATION: require("@/assets/scan/daily-consultation.png"),
  DOCTORICONS: require("@/assets/scan/doctor-icons.png"),
  CONFIDENTIAL: require("@/assets/scan/confidential.png"),
  CONVENIENCE: require("@/assets/scan/convenience.png"),
  DOCTORICON: require("@/assets/scan/doctor-icon.png"),
  WALLETS: require("@/assets/scan/wallets.png"),
  SURGERY: require("@/assets/scan/Surgery.png"),
};

export { IMAGES };
