# Database Entity-Relationship Diagram

Here is the complete ER Diagram for the Personal Calorie Tracker database based on the Prisma schema.

```mermaid
erDiagram
    User ||--o{ RefreshToken : "has many"
    User ||--o{ Goal : "has many"
    User ||--o{ FoodEntry : "has many"
    User ||--o{ WeightLog : "has many"
    
    FoodEntry ||--o{ FoodEntryNutrient : "contains"
    Nutrient ||--o{ FoodEntryNutrient : "is referenced by"

    User {
        String id PK
        String email UK
        String passwordHash
        String timezone
        DateTime createdAt
        DateTime updatedAt
    }

    RefreshToken {
        String id PK
        String userId FK
        String tokenHash UK
        DateTime expiresAt
        DateTime createdAt
        DateTime revokedAt
    }

    Goal {
        String id PK
        String userId FK
        Decimal calorieTarget
        Decimal proteinTarget
        Decimal carbsTarget
        Decimal fatTarget
        Decimal weightGoal
        DateTime effectiveFrom
        DateTime effectiveTo
        DateTime createdAt
        DateTime updatedAt
    }

    FoodEntry {
        String id PK
        String userId FK
        String foodName
        MealType mealType
        DateTime eatenAt
        Decimal quantity
        QuantityUnit quantityUnit
        Decimal calories
        Decimal proteinG
        Decimal carbsG
        Decimal fatG
        FoodEntrySource source
        Decimal aiConfidence
        DateTime createdAt
        DateTime updatedAt
    }

    Nutrient {
        Int id PK
        String code UK
        String name
        String unit
        NutrientCategory category
    }

    FoodEntryNutrient {
        String foodEntryId FK
        Int nutrientId FK
        Decimal amount
    }
```

### Enumerations Used
- **MealType**: `BREAKFAST`, `LUNCH`, `DINNER`, `SNACK`
- **QuantityUnit**: `GRAM`, `MILLILITER`, `PIECE`, `SERVING`
- **FoodEntrySource**: `MANUAL`, `AI_IMAGE`
- **NutrientCategory**: `VITAMIN`, `MINERAL`
