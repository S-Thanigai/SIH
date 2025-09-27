import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Common
      'welcome': 'Welcome',
      'login': 'Login',
      'register': 'Register',
      'logout': 'Logout',
      'dashboard': 'Dashboard',
      'profile': 'Profile',
      'about': 'About',
      'language': 'Language',
      
      // Landing Page
      'smart_health_monitoring': 'Smart Community Health Monitoring',
      'protecting_communities': 'Protecting Communities Through Smart Water Quality Monitoring',
      'system_description': 'Our system helps prevent waterborne diseases by monitoring water quality in real-time and predicting potential health risks.',
      'check_water_quality': 'Check Water Quality',
      'sign_in': 'Sign In',
      'sign_up': 'Sign Up',
      'municipality_worker': 'Municipality Worker',
      'health_official': 'Health Official',
      'community_volunteer': 'Community Volunteer',
      
      // Dashboard
      'risk_score': 'Risk Score',
      'safe': 'Safe',
      'unsafe': 'Unsafe',
      'water_status': 'Water Status',
      'recent_data': 'Recent Water Quality Data',
      'location': 'Location',
      'date': 'Date',
      'ph_level': 'pH Level',
      'turbidity': 'Turbidity',
      
      // Data Collection
      'data_collection': 'Data Collection',
      'submit_data': 'Submit Data',
      'select_location': 'Select Location',
      'enter_ph': 'Enter pH Level',
      'enter_turbidity': 'Enter Turbidity (NTU)',
      'enter_chloride': 'Enter Chloride (mg/L)',
      'enter_nitrite': 'Enter Nitrite (mg/L)',
      'enter_tds': 'Enter TDS (mg/L)',
      
      // Alerts
      'alerts': 'Alerts',
      'outbreak_predictions': 'Outbreak Predictions',
      'days_prediction': 'days prediction',
      'probability': 'Probability',
      'severity': 'Severity',
      'low': 'Low',
      'moderate': 'Moderate',
      'high': 'High',
      
      // Awareness
      'awareness': 'Awareness',
      'waterborne_diseases': 'Waterborne Diseases',
      'prevention_tips': 'Prevention Tips',
      'public_health': 'Public Health Guidelines',
    }
  },
  as: {
    translation: {
      'welcome': 'স্বাগতম',
      'login': 'লগইন',
      'register': 'নিবন্ধন',
      'dashboard': 'ড্যাশবোৰ্ড',
      'smart_health_monitoring': 'স্মাৰ্ট সম্প্ৰদায় স্বাস্থ্য নিৰীক্ষণ',
      'check_water_quality': 'পানীৰ গুণগত মান পৰীক্ষা কৰক',
      'municipality_worker': 'পৌৰসভা কৰ্মী',
      'health_official': 'স্বাস্থ্য বিষয়া',
      'community_volunteer': 'সম্প্ৰদায় স্বেচ্ছাসেৱক',
      'risk_score': 'বিপদৰ স্কোৰ',
      'safe': 'নিৰাপদ',
      'unsafe': 'অনিৰাপদ',
      'location': 'স্থান',
      'date': 'তাৰিখ',
    }
  },
  hi: {
    translation: {
      'welcome': 'स्वागत',
      'login': 'लॉग इन',
      'register': 'पंजीकरण',
      'dashboard': 'डैशबोर्ड',
      'smart_health_monitoring': 'स्मार्ट सामुदायिक स्वास्थ्य निगरानी',
      'check_water_quality': 'पानी की गुणवत्ता जांचें',
      'municipality_worker': 'नगरपालिका कर्मचारी',
      'health_official': 'स्वास्थ्य अधिकारी',
      'community_volunteer': 'सामुदायिक स्वयंसेवक',
      'risk_score': 'जोखिम स्कोर',
      'safe': 'सुरक्षित',
      'unsafe': 'असुरक्षित',
      'location': 'स्थान',
      'date': 'दिनांक',
    }
  },
  bn: {
    translation: {
      'welcome': 'স্বাগতম',
      'login': 'লগইন',
      'register': 'নিবন্ধন',
      'dashboard': 'ড্যাশবোর্ড',
      'smart_health_monitoring': 'স্মার্ট কমিউনিটি স্বাস্থ্য নিরীক্ষণ',
      'check_water_quality': 'পানির গুণমান পরীক্ষা করুন',
      'municipality_worker': 'পৌরসভা কর্মী',
      'health_official': 'স্বাস্থ্য কর্মকর্তা',
      'community_volunteer': 'সম্প্রদায়ের স্বেচ্ছাসেবক',
      'risk_score': 'ঝুঁকির স্কোর',
      'safe': 'নিরাপদ',
      'unsafe': 'অনিরাপদ',
      'location': 'অবস্থান',
      'date': 'তারিখ',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;