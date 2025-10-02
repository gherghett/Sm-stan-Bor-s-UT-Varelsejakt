
```tsx
const [filterType, setFilterType] = useState("all");
```

```tsx
// filtrera katalogen baserat på state
const filteredCatalog = catalog
  ? catalog.filter((item) => {
      if (filterType === "all") return true;
      return item.type === filterType;
    })
  : [];
```

```tsx
<SegmentedButtons
  value={filterType}
  onValueChange={setFilterType}
  buttons={[
    {
      value: "all",
      label: "Allt",
    },
    {
      value: "creature", 
      label: "Varelser",
    },
    {
      value: "plot",
      label: "Möten",
    },
  ]}
  style={styles.segmentedButtons}
/>
```

```tsx
{/* Display filtered content */}
{catalog && filteredCatalog.length > 0 && (
  <ScrollView>
    {/* SegmentedButtons component goes here */}
    <View style={styles.grid}>
      {filteredCatalog.map((creature) => (
        <Card key={creature.$id} style={styles.card}>
          {/* Card content */}
        </Card>
      ))}
    </View>
  </ScrollView>
)}
```
