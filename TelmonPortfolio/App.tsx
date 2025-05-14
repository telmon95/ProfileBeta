import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Dimensions,
  ImageSourcePropType,
  ViewStyle, TextStyle, ImageStyle,
  Animated,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const { width } = Dimensions.get('window');

// --- Define Theme Colors ---
const darkTheme = {
  background: '#121212',
  cardBackground: '#1E1E1E',
  primaryText: '#EAEAEA',
  secondaryText: '#B0B0B0',
  accent: '#00DAC6',
  subtleBorder: '#2A2A2A',
  shadowColor: '#000',
};

// --- Define Types for your Data ---
interface SkillItemData {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap | keyof typeof FontAwesome5.glyphMap;
  color?: string;
  iconSet?: typeof MaterialCommunityIcons | typeof FontAwesome5;
}

interface SkillCategoryData {
  category: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  items: SkillItemData[];
}

interface ProjectData {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: ImageSourcePropType;
}

interface ContactData {
  email?: string;
  linkedin?: string;
  github?: string;
  whatsapp?: string;
}

interface PortfolioData {
  name: string;
  title: string;
  location: string;
  profileImage: ImageSourcePropType;
  shortBio: string;
  skills: SkillCategoryData[];
  projects: ProjectData[];
  contact: ContactData;
}

// --- Your Data ---
const portfolioData: PortfolioData = {
  name: 'Telmon Maluleka',
  title: 'Full-Stack Software Engineer',
  location: 'South Africa',
  profileImage: require('./assets/profile-placeholder.png'),
  shortBio:
    'ALX full-stack software engineer with a healthcare background, passionate about building tools that make a real impact on people’s lives.',
  skills: [
    {
      category: 'Programming Languages',
      icon: 'code-tags',
      items: [
        { name: 'JavaScript', icon: 'language-javascript', color: '#F7DF1E' },
        { name: 'Python', icon: 'language-python', color: '#3776AB' },
        { name: 'TypeScript', icon: 'language-typescript', color: '#3178C6' },
        { name: 'C', icon: 'language-c', color: '#A8B9CC' },
        { name: 'HTML5', icon: 'language-html5', color: '#E34F26' },
        { name: 'CSS3', icon: 'language-css3', color: '#1572B6' },
      ],
    },
    {
      category: 'Frameworks & Libraries',
      icon: 'react',
      items: [
        { name: 'React / React Native', icon: 'react', color: '#61DAFB' },
        { name: 'Node.js', icon: 'nodejs', color: '#339933' },
        { name: 'Django', icon: 'alpha-d-box', color: '#092E20' },
        { name: 'Flask', icon: 'bottle-tonic-outline' },
      ],
    },
    {
      category: 'Databases',
      icon: 'database',
      items: [{ name: 'MySQL', icon: 'database', color: '#4479A1' }],
    },
    {
      category: 'Cloud Platforms',
      icon: 'cloud-outline',
      items: [{ name: 'AWS', icon: 'aws', color: '#FF9900', iconSet: FontAwesome5 }],
    },
    {
      category: 'Tools & Others',
      icon: 'tools',
      items: [
        { name: 'Git', icon: 'git', color: '#F05032' },
        { name: 'REST APIs', icon: 'api' },
      ],
    },
  ],
  projects: [
    {
      title: 'Nearby Cheaper Houses Finder',
      description:
        'A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) to find houses in the vicinity of a selected area that are priced lower than the median price within that selected area.',
      technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'MERN'],
      link: '#',
    },
    {
      title: 'Weather Widget',
      description:
        'A simple, responsive weather widget that displays real-time weather data using the OpenWeatherMap API.',
      technologies: ['React', 'HTML', 'CSS', 'API'],
      link: '#',
    },
  ],
  contact: {
    linkedin: 'https://www.linkedin.com/in/telmon-maluleka-9a0699146/',
    github: 'https://github.com/telmon95',
    whatsapp: 'https://wa.me/27691119555',
  },
};

// --- Helper Functions ---
const openLink = (url: string): void => {
  Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
};

// --- Animated Components ---
interface AnimatedSkillItemProps {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap | keyof typeof FontAwesome5.glyphMap;
  color?: string;
  iconSet?: typeof MaterialCommunityIcons | typeof FontAwesome5;
  index?: number;
  fontsLoaded?: boolean;
}

const AnimatedSkillItem: React.FC<AnimatedSkillItemProps> = ({ name, icon, color, iconSet = MaterialCommunityIcons, index = 0, fontsLoaded }) => {
  const itemFadeAnim = useRef(new Animated.Value(0)).current;
  const itemSlideAnim = useRef(new Animated.Value(20)).current;
  const theme = darkTheme;

  useEffect(() => {
    if(fontsLoaded){
        Animated.sequence([
        Animated.delay(index * 100 + 1000), // Ensure this timing works with the main sequence
        Animated.parallel([
            Animated.timing(itemFadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
            Animated.timing(itemSlideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
        ]),
        ]).start();
    }
  }, [itemFadeAnim, itemSlideAnim, index, fontsLoaded]);

  const IconComponent = iconSet;
  const styles = getStyles(theme, fontsLoaded || false);

  return (
    <Animated.View style={[
      styles.skillItem,
      {
        opacity: itemFadeAnim,
        transform: [{ translateY: itemSlideAnim }]
      }
    ]}>
      <IconComponent name={icon as any} size={22} color={color || theme.accent} style={styles.skillIcon} />
      <Text style={styles.skillText}>{name}</Text>
    </Animated.View>
  );
};

// --- Main App Component ---
export default function App(): JSX.Element {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'), // UNCOMMENTED
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),   // UNCOMMENTED
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'), // UNCOMMENTED
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'), // UNCOMMENTED
  });

  const theme = darkTheme;
  const styles = getStyles(theme, fontsLoaded || false);

  // Animation Refs
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlideUpAnim = useRef(new Animated.Value(30)).current;
  const aboutTitleFadeAnim = useRef(new Animated.Value(0)).current;
  const aboutTitleSlideUpAnim = useRef(new Animated.Value(20)).current;
  const skillsTitleFadeAnim = useRef(new Animated.Value(0)).current;
  const skillsTitleSlideUpAnim = useRef(new Animated.Value(20)).current;
  const projectsTitleFadeAnim = useRef(new Animated.Value(0)).current;
  const projectsTitleSlideUpAnim = useRef(new Animated.Value(20)).current;
  const contactTitleFadeAnim = useRef(new Animated.Value(0)).current;
  const contactTitleSlideUpAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (fontError) {
      console.error("--- FONT LOADING ERROR ---");
      console.error(fontError.message);
      console.error("--------------------------");
    } else if (fontsLoaded) {
      console.log("--- ALL ATTEMPTED FONTS LOADED SUCCESSFULLY ---");
    } else {
      console.log("--- Fonts still loading or useFonts not yet resolved ---");
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      Animated.sequence([
        Animated.delay(300),
        Animated.parallel([
          Animated.timing(headerFadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
          Animated.timing(headerSlideUpAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
        ]),
        Animated.delay(200),
        Animated.parallel([
          Animated.timing(aboutTitleFadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
          Animated.timing(aboutTitleSlideUpAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]),
        Animated.delay(200),
        Animated.parallel([
          Animated.timing(skillsTitleFadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
          Animated.timing(skillsTitleSlideUpAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]),
         Animated.delay(200),
        Animated.parallel([
            Animated.timing(projectsTitleFadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.timing(projectsTitleSlideUpAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]),
        Animated.delay(200),
        Animated.parallel([
            Animated.timing(contactTitleFadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.timing(contactTitleSlideUpAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]),
      ]).start();
    }
  }, [
    fontsLoaded,
    headerFadeAnim, headerSlideUpAnim,
    aboutTitleFadeAnim, aboutTitleSlideUpAnim,
    skillsTitleFadeAnim, skillsTitleSlideUpAnim,
    projectsTitleFadeAnim, projectsTitleSlideUpAnim,
    contactTitleFadeAnim, contactTitleSlideUpAnim
  ]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.accent} />
        <Text style={{color: theme.primaryText, marginTop: 10, fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif'}}>Loading Portfolio...</Text>
      </View>
    );
  }

  if (fontError) {
     return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: theme.background }}>
        <MaterialCommunityIcons name="alert-circle-outline" size={48} color="red" />
        <Text style={{color: 'red', fontSize: 18, textAlign: 'center', marginTop: 15, fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif'}}>Font Loading Error</Text>
        <Text style={{color: theme.secondaryText, fontSize: 14, textAlign: 'center', marginTop: 10, fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif'}}>
          Failed to load custom fonts. Please check the console for details (usually in the terminal where Metro is running).
          Ensure font files are correctly named and placed in the 'assets/fonts' directory.
        </Text>
        <Text style={{color: 'orange', fontSize: 12, textAlign: 'center', marginTop: 20, fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif'}}>Error: {fontError.message}</Text>
      </View>
    );
  }

  return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Animated.View style={[styles.headerSection, { opacity: headerFadeAnim, transform: [{ translateY: headerSlideUpAnim }] }]}>
            <Image source={portfolioData.profileImage} style={styles.profileImage} />
            <Text style={styles.nameText}>{portfolioData.name}</Text>
            <Text style={styles.titleText}>{portfolioData.title}</Text>
            <Text style={styles.locationText}>
              <MaterialCommunityIcons name="map-marker-outline" size={16} color={theme.secondaryText} /> {portfolioData.location}
            </Text>
          </Animated.View>

          <View style={styles.section}>
            <Animated.Text style={[styles.sectionTitle, { opacity: aboutTitleFadeAnim, transform: [{ translateY: aboutTitleSlideUpAnim }] }]}>
              About Me
            </Animated.Text>
            <Text style={styles.bioText}>{portfolioData.shortBio}</Text>
          </View>

          <View style={styles.section}>
            <Animated.Text style={[styles.sectionTitle, { opacity: skillsTitleFadeAnim, transform: [{ translateY: skillsTitleSlideUpAnim }] }]}>
              Skills & Technologies
            </Animated.Text>
            {portfolioData.skills.map((skillCategory) => (
              <View key={skillCategory.category} style={styles.skillCategory}>
                <View style={styles.skillCategoryHeader}>
                  <MaterialCommunityIcons name={skillCategory.icon} size={26} color={theme.accent} />
                  <Text style={styles.skillCategoryTitle}>{skillCategory.category}</Text>
                </View>
                <View style={styles.skillsGrid}>
                  {skillCategory.items.map((item, itemIndex) => (
                    <AnimatedSkillItem
                      key={item.name}
                      name={item.name}
                      icon={item.icon}
                      color={item.color}
                      iconSet={item.iconSet || MaterialCommunityIcons}
                      index={itemIndex}
                      fontsLoaded={fontsLoaded}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Animated.Text style={[styles.sectionTitle, { opacity: projectsTitleFadeAnim, transform: [{ translateY: projectsTitleSlideUpAnim }] }]}>
              Projects
            </Animated.Text>
            {portfolioData.projects.map((project, index) => (
              <View key={index} style={styles.projectCard}>
                 {project.image && <Image source={project.image} style={styles.projectImage} resizeMode="cover" />}
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectDescription}>{project.description}</Text>
                <View style={styles.projectTechContainer}>
                  {project.technologies.map((tech) => (
                    <Text key={tech} style={styles.projectTech}>
                      {tech}
                    </Text>
                  ))}
                </View>
                {project.link && project.link !== '#' && (
                  <TouchableOpacity onPress={() => openLink(project.link!)} style={styles.projectLinkButton}>
                    <Text style={styles.projectLinkText}>View Project</Text>
                    <MaterialCommunityIcons name="arrow-right-thin-circle-outline" size={22} color={darkTheme.background} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <Text style={styles.noteText}>More projects coming soon...</Text>
          </View>

          <View style={styles.section}>
            <Animated.Text style={[styles.sectionTitle, { opacity: contactTitleFadeAnim, transform: [{ translateY: contactTitleSlideUpAnim }] }]}>
              Get in Touch
            </Animated.Text>
            <View style={styles.contactButtonsContainer}>
              {portfolioData.contact.linkedin && (
                <TouchableOpacity style={[styles.contactButton, { backgroundColor: '#0077B5' }]} onPress={() => openLink(portfolioData.contact.linkedin!)}>
                  <AntDesign name="linkedin-square" size={24} color="white" />
                  <Text style={styles.contactButtonText}>LinkedIn</Text>
                </TouchableOpacity>
              )}
              {portfolioData.contact.github && (
                <TouchableOpacity style={[styles.contactButton, { backgroundColor: '#303030' }]} onPress={() => openLink(portfolioData.contact.github!)}>
                  <AntDesign name="github" size={24} color="white" />
                  <Text style={styles.contactButtonText}>GitHub</Text>
                </TouchableOpacity>
              )}
              {portfolioData.contact.whatsapp && (
                <TouchableOpacity style={[styles.contactButton, { backgroundColor: '#25D366' }]} onPress={() => openLink(portfolioData.contact.whatsapp!)}>
                  <MaterialCommunityIcons name="whatsapp" size={24} color="white" />
                  <Text style={styles.contactButtonText}>WhatsApp</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Text style={styles.footerText}>© {new Date().getFullYear()} Telmon Maluleka. All rights reserved.</Text>
        </ScrollView>
      </SafeAreaView>
  );
}

// --- Define Style Types ---
interface Styles {
  safeArea: ViewStyle;
  container: ViewStyle;
  headerSection: ViewStyle;
  profileImage: ImageStyle;
  nameText: TextStyle;
  titleText: TextStyle;
  locationText: TextStyle;
  section: ViewStyle;
  sectionTitle: TextStyle;
  bioText: TextStyle;
  skillCategory: ViewStyle;
  skillCategoryHeader: ViewStyle;
  skillCategoryTitle: TextStyle;
  skillsGrid: ViewStyle;
  skillItem: ViewStyle;
  skillIcon: TextStyle;
  skillText: TextStyle;
  projectCard: ViewStyle;
  projectImage?: ImageStyle;
  projectTitle: TextStyle;
  projectDescription: TextStyle;
  projectTechContainer: ViewStyle;
  projectTech: TextStyle;
  projectLinkButton: ViewStyle;
  projectLinkText: TextStyle;
  noteText: TextStyle;
  contactButtonsContainer: ViewStyle;
  contactButton: ViewStyle;
  contactButtonText: TextStyle;
  footerText: TextStyle;
}


// --- Styles Function ---
const getStyles = (theme: typeof darkTheme, fontsActuallyLoaded: boolean): Styles => {
  const FONT_FAMILY_BOLD = fontsActuallyLoaded ? 'Poppins-Bold' : Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed';
  const FONT_FAMILY_SEMIBOLD = fontsActuallyLoaded ? 'Poppins-SemiBold' : Platform.OS === 'ios' ? 'System' : 'sans-serif-medium';
  const FONT_FAMILY_MEDIUM = fontsActuallyLoaded ? 'Poppins-Medium' : Platform.OS === 'ios' ? 'System' : 'sans-serif-medium';
  const FONT_FAMILY_REGULAR = fontsActuallyLoaded ? 'OpenSans-Regular' : Platform.OS === 'ios' ? 'System' : 'sans-serif';
  const FONT_FAMILY_OPENSANS_SEMIBOLD = fontsActuallyLoaded ? 'OpenSans-SemiBold' : Platform.OS === 'ios' ? 'System' : 'sans-serif-medium';


  return StyleSheet.create<Styles>({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      paddingHorizontal: 20,
      paddingBottom: 50,
    },
    headerSection: {
      alignItems: 'center',
      paddingVertical: 40,
      borderBottomWidth: 1,
      borderBottomColor: theme.subtleBorder,
      marginBottom: 30,
    },
    profileImage: {
      width: 140,
      height: 140,
      borderRadius: 70,
      marginBottom: 20,
      borderWidth: 4,
      borderColor: theme.accent,
    },
    nameText: {
      fontFamily: FONT_FAMILY_BOLD,
      fontSize: 32,
      color: theme.primaryText,
      marginBottom: 4,
    },
    titleText: {
      fontFamily: FONT_FAMILY_MEDIUM,
      fontSize: 20,
      color: theme.secondaryText,
      marginBottom: 10,
    },
    locationText: {
      fontFamily: FONT_FAMILY_REGULAR,
      fontSize: 16,
      color: theme.secondaryText,
    },
    section: {
      marginBottom: 40,
    },
    sectionTitle: {
      fontFamily: FONT_FAMILY_SEMIBOLD,
      fontSize: 26,
      color: theme.primaryText,
      marginBottom: 20,
      paddingBottom: 8,
      borderBottomWidth: 2,
      borderBottomColor: theme.accent,
    },
    bioText: {
      fontFamily: FONT_FAMILY_REGULAR,
      fontSize: 17,
      lineHeight: 28,
      color: theme.secondaryText,
      textAlign: 'left',
    },
    skillCategory: {
      marginBottom: 25,
    },
    skillCategoryHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    skillCategoryTitle: {
      fontFamily: FONT_FAMILY_MEDIUM,
      fontSize: 20,
      marginLeft: 12,
      color: theme.primaryText,
    },
    skillsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    skillItem: {
      backgroundColor: theme.cardBackground,
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderRadius: 25,
      margin: 6,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.subtleBorder,
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    skillIcon: {
      marginRight: 10,
    },
    skillText: {
      fontFamily: FONT_FAMILY_OPENSANS_SEMIBOLD,
      fontSize: 16,
      color: theme.primaryText,
    },
    projectCard: {
      backgroundColor: theme.cardBackground,
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: theme.subtleBorder,
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6,
    },
    projectImage: {
      width: '100%',
      height: 180,
      borderRadius: 8,
      marginBottom: 15,
    },
    projectTitle: {
      fontFamily: FONT_FAMILY_SEMIBOLD,
      fontSize: 22,
      color: theme.accent,
      marginBottom: 8,
    },
    projectDescription: {
      fontFamily: FONT_FAMILY_REGULAR,
      fontSize: 16,
      color: theme.secondaryText,
      marginBottom: 15,
      lineHeight: 24,
    },
    projectTechContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 15,
    },
    projectTech: {
      fontFamily: FONT_FAMILY_OPENSANS_SEMIBOLD,
      backgroundColor: theme.accent + '20',
      color: theme.accent,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
      marginRight: 8,
      marginBottom: 8,
      fontSize: 13,
    },
    projectLinkButton: {
      backgroundColor: theme.accent,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    projectLinkText: {
      fontFamily: FONT_FAMILY_MEDIUM,
      color: theme.background,
      fontSize: 16,
      marginRight: 10,
    },
    noteText: {
      fontFamily: FONT_FAMILY_REGULAR,
      textAlign: 'center',
      fontStyle: 'italic',
      color: theme.secondaryText,
      marginTop: 15,
    },
    contactButtonsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 15,
    },
    contactButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      paddingHorizontal: 22,
      borderRadius: 30,
      margin: 10,
      minWidth: width * 0.4,
      justifyContent: 'center',
      shadowColor: theme.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 4,
    },
    contactButtonText: {
      fontFamily: FONT_FAMILY_MEDIUM,
      color: 'white',
      marginLeft: 12,
      fontSize: 16,
    },
    footerText: {
      fontFamily: FONT_FAMILY_REGULAR,
      textAlign: 'center',
      marginTop: 40,
      color: theme.secondaryText,
      fontSize: 13,
    },
  });
}