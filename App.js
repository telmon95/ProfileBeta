import React from 'react';
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
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons'; // Import icon sets

const { width } = Dimensions.get('window'); // Get screen width for responsiveness

// --- Your Data ---
const portfolioData = {
  name: 'Telmon Maluleka',
  title: 'Full-Stack Software Engineer',
  location: 'South Africa',
  profileImage: require('./assets/profile-placeholder.png'), // Create this image in your assets folder
  shortBio:
    'ALX full-stack software engineer with a healthcare background, passionate about building tools that make a real impact on people’s lives.',
  skills: [
    {
      category: 'Programming Languages',
      icon: 'code-tags', // MaterialCommunityIcons
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
      icon: 'react', // MaterialCommunityIcons (React logo)
      items: [
        { name: 'React / React Native', icon: 'react', color: '#61DAFB' },
        { name: 'Node.js', icon: 'nodejs', color: '#339933' },
        { name: 'Django', icon: 'alpha-d-box', color: '#092E20' }, // Simple 'D'
        { name: 'Flask', icon: 'bottle-tonic-outline', color: '#000000' }, // Flask icon
      ],
    },
    {
      category: 'Databases',
      icon: 'database', // MaterialCommunityIcons
      items: [{ name: 'MySQL', icon: 'database', color: '#4479A1' }],
    },
    {
      category: 'Cloud Platforms',
      icon: 'cloud-outline', // MaterialCommunityIcons
      items: [{ name: 'AWS', icon: 'aws', color: '#FF9900' }], // FontAwesome5 for AWS
    },
    {
      category: 'Tools & Others',
      icon: 'tools', // MaterialCommunityIcons
      items: [
        { name: 'Git', icon: 'git', color: '#F05032' },
        { name: 'REST APIs', icon: 'api', color: '#38A3A5' },
      ],
    },
  ],
  projects: [
    {
      title: 'Weather Widget',
      description:
        'A simple, responsive weather widget that displays real-time weather data using the OpenWeatherMap API.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'API'],
      link: '#', // Replace with actual link
    },
    // Add more projects here
  ],
  contact: {
    email: 'your.email@example.com', // Replace with your email
    linkedin: 'https://www.linkedin.com/in/telmon-maluleka-9a0699146/',
    github: 'https://github.com/telmon95',
    whatsapp: 'https://wa.me/27691119555', // Corrected WhatsApp link
  },
};

// --- Helper Functions ---
const openLink = (url) => {
  Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
};

// --- Components ---
const SkillItem = ({ name, icon, color, iconSet = MaterialCommunityIcons }) => {
  const IconComponent = iconSet;
  return (
    <View style={styles.skillItem}>
      <IconComponent name={icon} size={22} color={color || styles.accentColor.color} style={styles.skillIcon} />
      <Text style={styles.skillText}>{name}</Text>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* --- Header Section --- */}
        <View style={styles.headerSection}>
          <Image source={portfolioData.profileImage} style={styles.profileImage} />
          <Text style={styles.nameText}>{portfolioData.name}</Text>
          <Text style={styles.titleText}>{portfolioData.title}</Text>
          <Text style={styles.locationText}>
            <MaterialCommunityIcons name="map-marker-outline" size={16} color="#777" /> {portfolioData.location}
          </Text>
        </View>

        {/* --- About Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.bioText}>{portfolioData.shortBio}</Text>
        </View>

        {/* --- Skills Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills & Technologies</Text>
          {portfolioData.skills.map((skillCategory) => (
            <View key={skillCategory.category} style={styles.skillCategory}>
              <View style={styles.skillCategoryHeader}>
                <MaterialCommunityIcons name={skillCategory.icon} size={24} color={styles.accentColor.color} />
                <Text style={styles.skillCategoryTitle}>{skillCategory.category}</Text>
              </View>
              <View style={styles.skillsGrid}>
                {skillCategory.items.map((item) => (
                  <SkillItem
                    key={item.name}
                    name={item.name}
                    icon={item.icon}
                    color={item.color}
                    iconSet={item.name === 'AWS' ? FontAwesome5 : MaterialCommunityIcons} // Use FontAwesome for AWS specifically
                  />
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* --- Projects Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {portfolioData.projects.map((project, index) => (
            <View key={index} style={styles.projectCard}>
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
                <TouchableOpacity onPress={() => openLink(project.link)} style={styles.projectLinkButton}>
                  <Text style={styles.projectLinkText}>View Project</Text>
                  <MaterialCommunityIcons name="arrow-right-thin-circle-outline" size={20} color="#FFF" />
                </TouchableOpacity>
              )}
            </View>
          ))}
           <Text style={styles.noteText}>More projects coming soon...</Text>
        </View>

        {/* --- Contact Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          <View style={styles.contactButtonsContainer}>
            {portfolioData.contact.linkedin && (
              <TouchableOpacity
                style={[styles.contactButton, { backgroundColor: '#0077B5' }]}
                onPress={() => openLink(portfolioData.contact.linkedin)}
              >
                <AntDesign name="linkedin-square" size={24} color="white" />
                <Text style={styles.contactButtonText}>LinkedIn</Text>
              </TouchableOpacity>
            )}
            {portfolioData.contact.github && (
              <TouchableOpacity
                style={[styles.contactButton, { backgroundColor: '#333' }]}
                onPress={() => openLink(portfolioData.contact.github)}
              >
                <AntDesign name="github" size={24} color="white" />
                <Text style={styles.contactButtonText}>GitHub</Text>
              </TouchableOpacity>
            )}
            {portfolioData.contact.whatsapp && (
              <TouchableOpacity
                style={[styles.contactButton, { backgroundColor: '#25D366' }]}
                onPress={() => openLink(portfolioData.contact.whatsapp)}
              >
                <MaterialCommunityIcons name="whatsapp" size={24} color="white" />
                <Text style={styles.contactButtonText}>WhatsApp</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* --- Footer --- */}
        <Text style={styles.footerText}>© {new Date().getFullYear()} Telmon Maluleka. All rights reserved.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7F9', // Light background for the whole app
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40, // For scroll room
  },
  accentColor: { // Define accent color for reuse
    color: '#008080', // Teal accent
  },
  // Header
  headerSection: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#008080', // Accent color border
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  titleText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 16,
    color: '#777',
  },
  // General Section
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#008080', // Accent color
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A4A4A',
    textAlign: 'justify',
  },
  // Skills
  skillCategory: {
    marginBottom: 20,
  },
  skillCategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  skillCategoryTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 8,
    color: '#333',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Or 'space-between' if preferred
  },
  skillItem: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20, // Pill shape
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  skillIcon: {
    marginRight: 8,
  },
  skillText: {
    fontSize: 15,
    color: '#4A4A4A',
  },
  // Projects
  projectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#008080', // Accent
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 15,
    color: '#4A4A4A',
    marginBottom: 10,
    lineHeight: 22,
  },
  projectTechContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  projectTech: {
    backgroundColor: '#E0F2F1', // Light teal
    color: '#00695C', // Darker teal
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 12,
  },
  projectLinkButton: {
    backgroundColor: '#008080', // Accent
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  projectLinkText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
    marginRight: 8,
  },
  noteText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#777',
    marginTop: 10,
  },
  // Contact
  contactButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center buttons
    marginTop: 10,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // Pill shape
    margin: 8, // Spacing around buttons
    minWidth: width * 0.35, // Ensure buttons have a decent width
    justifyContent: 'center',
  },
  contactButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  // Footer
  footerText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#888',
    fontSize: 12,
  },
});