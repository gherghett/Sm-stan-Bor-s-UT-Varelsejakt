// EXAMPLE: Complete themed component demonstrating all features

import { MyThemeContext } from "@/lib/theme-context";
import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  Card,
  Chip,
  Divider,
  FAB,
  IconButton,
  Switch,
  Text,
  TextInput,
  useTheme
} from "react-native-paper";

export default function ThemedComponentExample() {
  // Access theme switching context
  const { setDarkmode, isDarkmode } = useContext(MyThemeContext);
  
  // Access current theme for custom styling
  const theme = useTheme();

  return (
    <ScrollView 
      style={{ 
        flex: 1, 
        backgroundColor: theme.colors.background 
      }}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Theme Toggle Section */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 12 }}>
            Theme Settings
          </Text>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <Text>Dark Mode</Text>
            <Switch 
              value={isDarkmode} 
              onValueChange={setDarkmode}
            />
          </View>
          <Text variant="bodySmall" style={{ marginTop: 8, opacity: 0.7 }}>
            Current theme: {isDarkmode ? 'Dark' : 'Light'}
          </Text>
        </Card.Content>
      </Card>

      {/* Button Variants */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 12 }}>
            Button Variants
          </Text>
          <View style={{ gap: 8 }}>
            <Button mode="contained">Contained Button</Button>
            <Button mode="outlined">Outlined Button</Button>
            <Button mode="text">Text Button</Button>
            <Button mode="contained-tonal">Contained Tonal</Button>
          </View>
        </Card.Content>
      </Card>

      {/* Color Chips */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 12 }}>
            Color System
          </Text>
          <View style={{ 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            gap: 8 
          }}>
            <Chip>Primary</Chip>
            <Chip mode="outlined">Secondary</Chip>
            <Chip 
              style={{ backgroundColor: theme.colors.tertiary }}
              textStyle={{ color: theme.colors.onTertiary }}
            >
              Tertiary
            </Chip>
            <Chip 
              style={{ backgroundColor: theme.colors.error }}
              textStyle={{ color: theme.colors.onError }}
            >
              Error
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Input Fields */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 12 }}>
            Input Fields
          </Text>
          <View style={{ gap: 12 }}>
            <TextInput
              label="Outlined Input"
              mode="outlined"
              placeholder="Enter text..."
            />
            <TextInput
              label="Flat Input"
              mode="flat"
              placeholder="Enter text..."
            />
          </View>
        </Card.Content>
      </Card>

      {/* Typography Scale */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 12 }}>
            Typography Scale
          </Text>
          <View style={{ gap: 4 }}>
            <Text variant="displayLarge">Display Large</Text>
            <Text variant="displayMedium">Display Medium</Text>
            <Text variant="displaySmall">Display Small</Text>
            <Divider style={{ marginVertical: 8 }} />
            <Text variant="headlineLarge">Headline Large</Text>
            <Text variant="headlineMedium">Headline Medium</Text>
            <Text variant="headlineSmall">Headline Small</Text>
            <Divider style={{ marginVertical: 8 }} />
            <Text variant="titleLarge">Title Large</Text>
            <Text variant="titleMedium">Title Medium</Text>
            <Text variant="titleSmall">Title Small</Text>
            <Divider style={{ marginVertical: 8 }} />
            <Text variant="bodyLarge">Body Large</Text>
            <Text variant="bodyMedium">Body Medium</Text>
            <Text variant="bodySmall">Body Small</Text>
            <Divider style={{ marginVertical: 8 }} />
            <Text variant="labelLarge">Label Large</Text>
            <Text variant="labelMedium">Label Medium</Text>
            <Text variant="labelSmall">Label Small</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Surface Elevations */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 12 }}>
            Surface Elevations
          </Text>
          <View style={{ gap: 8 }}>
            {[0, 1, 2, 3, 4, 5].map((level) => (
              <View
                key={level}
                style={{
                  backgroundColor: theme.colors.elevation[`level${level}` as keyof typeof theme.colors.elevation],
                  padding: 12,
                  borderRadius: 8,
                }}
              >
                <Text>Elevation Level {level}</Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Custom Styled Component */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 12 }}>
            Custom Styling with Theme
          </Text>
          <View
            style={{
              backgroundColor: theme.colors.primaryContainer,
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.colors.outline,
            }}
          >
            <Text 
              style={{ 
                color: theme.colors.onPrimaryContainer,
                fontWeight: 'bold' 
              }}
            >
              Custom themed container
            </Text>
            <Text 
              style={{ 
                color: theme.colors.onPrimaryContainer,
                opacity: 0.8,
                marginTop: 4 
              }}
            >
              Using theme.colors.primaryContainer and theme.colors.onPrimaryContainer
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Icon Buttons */}
      <Card style={{ marginBottom: 100 }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 12 }}>
            Icon Buttons
          </Text>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-around',
            alignItems: 'center' 
          }}>
            <IconButton icon="heart" mode="contained" />
            <IconButton icon="star" mode="outlined" />
            <IconButton icon="thumb-up" />
            <IconButton 
              icon="settings" 
              mode="contained-tonal"
              iconColor={theme.colors.secondary}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => console.log('FAB pressed')}
      />
    </ScrollView>
  );
}

// 💡 KEY TAKEAWAYS FROM THIS EXAMPLE:
//
// 1. Use theme context for switching: const { setDarkmode, isDarkmode } = useContext(MyThemeContext);
// 2. Use theme hook for colors: const theme = useTheme();
// 3. React Native Paper components automatically use the theme
// 4. For custom styling, use theme.colors.* for consistency
// 5. Typography variants are built-in and themed automatically
// 6. Elevation levels provide consistent depth/shadow system
// 7. Always test with both light and dark themes
//
// COMMON THEME PROPERTIES:
// - theme.colors.primary / onPrimary
// - theme.colors.secondary / onSecondary  
// - theme.colors.background / onBackground
// - theme.colors.surface / onSurface
// - theme.colors.primaryContainer / onPrimaryContainer
// - theme.colors.outline / outlineVariant
// - theme.colors.elevation.level1-5