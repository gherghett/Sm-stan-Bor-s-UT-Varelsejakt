import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  Switch,
  Text,
  TextInput,
  useTheme
} from "react-native-paper";
import { MyThemeContext } from "../../context/theme-context";

export default function ThemeDemo() {
  const { setDarkmode, isDarkmode } = useContext(MyThemeContext);
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
            Purple Color System
          </Text>
          <View style={{ 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            gap: 8 
          }}>
            <Chip>Primary Purple</Chip>
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
          </View>
        </Card.Content>
      </Card>

      {/* Custom Styled Component */}
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 12 }}>
            Custom Purple Theming
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
              Purple themed container
            </Text>
            <Text 
              style={{ 
                color: theme.colors.onPrimaryContainer,
                opacity: 0.8,
                marginTop: 4 
              }}
            >
              Using your custom purple theme colors
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
              icon="palette" 
              mode="contained-tonal"
              iconColor={theme.colors.secondary}
            />
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}