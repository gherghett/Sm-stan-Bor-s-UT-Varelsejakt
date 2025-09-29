# Quick Implementation Checklist

## Step-by-Step Implementation

### 📦 1. Install Dependencies
```bash
npm install react-native-paper @react-navigation/native deepmerge
```

### 📁 2. Create File Structure
```
lib/
  ├── theme.tsx           # Theme definitions
  └── theme-context.tsx   # Context provider
```

### 🎨 3. Implementation Order

1. **Get your themes from [React Native Paper](https://callstack.github.io/react-native-paper/docs/guides/theming)**
2. **Create `lib/theme.tsx`** - Define your combined themes
3. **Create `lib/theme-context.tsx`** - Context provider with state management
4. **Update `app/_layout.tsx`** - Wrap app with `MyThemeProvider`
5. **Use in components** - Import and use `MyThemeContext`

### ⚡ Quick Copy-Paste Files

#### `lib/theme-context.tsx`
```tsx
import { appThemeDark, appThemeLight } from "@/lib/theme";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { createContext, ReactNode, useState } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";

interface ThemeContextType {
  setDarkmode: (isDark: boolean) => void;
  isDarkmode: boolean;
}

interface MyProviderProps {
  children: ReactNode;
}

export const MyThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function MyThemeProvider({ children }: MyProviderProps) {
  const systemScheme = useColorScheme();
  const [isDarkmode, setDarkmode] = useState(systemScheme === "dark");
  
  const theme = isDarkmode ? appThemeDark : appThemeLight;

  return (
    <PaperProvider theme={theme}>
      <NavigationThemeProvider value={theme}>
        <MyThemeContext.Provider value={{ setDarkmode, isDarkmode }}>
          {children}
        </MyThemeContext.Provider>
      </NavigationThemeProvider>
    </PaperProvider>
  );
}
```

### 🔧 Usage Examples

#### Theme Toggle Component
```tsx
import { MyThemeContext } from "@/lib/theme-context";
import { useContext } from "react";
import { Switch, Text } from "react-native-paper";

export function ThemeToggle() {
  const { setDarkmode, isDarkmode } = useContext(MyThemeContext);
  
  return (
    <>
      <Text>{isDarkmode ? "Dark" : "Light"} Mode</Text>
      <Switch value={isDarkmode} onValueChange={setDarkmode} />
    </>
  );
}
```

#### Access Theme in Component
```tsx
import { useTheme } from 'react-native-paper';

export function ThemedComponent() {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.surface }}>
      <Text style={{ color: theme.colors.onSurface }}>
        Themed text
      </Text>
    </View>
  );
}
```

### ✅ Verification Steps

1. **Install dependencies** ✓
2. **Create theme files** ✓  
3. **Wrap app with provider** ✓
4. **Test theme switching** ✓
5. **Verify both light/dark work** ✓
6. **Check navigation colors** ✓
7. **Test Paper components** ✓

### 🚨 Common Gotchas

- ❌ Don't forget `adaptNavigationTheme` 
- ❌ Missing `deepmerge` import
- ❌ Not wrapping app with `MyThemeProvider`
- ❌ Forgetting to update both light/dark themes
- ❌ Using wrong context import in components

### 🎯 Key Benefits

✅ **Unified theming** - One theme object for Navigation + Paper  
✅ **Type safety** - Full TypeScript support with `CombinedTheme`  
✅ **System integration** - Respects device preferences  
✅ **Manual override** - Users can choose theme  
✅ **Hot switching** - No app restart needed  
✅ **Technical compatibility** - Uses `adaptNavigationTheme` and `deepmerge`  

### 📚 Next Steps

1. Get complete themes from [React Native Paper Theme Builder](https://callstack.github.io/react-native-paper/docs/guides/theming)
2. Implement the unified theme architecture
3. Add theme toggle to your settings screen
4. Test theme integration with both libraries
5. Verify proper TypeScript types throughout