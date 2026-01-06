# Custom Stock Texts Extension

This extension renders configurable stock availability texts on the product page
based on the current product stock quantity.

## Placement

The component is rendered in the following portals:

- `product.availability`
- `product-item.availability`
- `favorites.availability-text`

---

## Stock Logic

The availability state is derived from the product stock quantity:

| Quantity       | Availability State | Text Source     |
|----------------|--------------------|-----------------|
| `<= 0`         | Alert              | `unavailable`   |
| `<= 5`         | Warning            | `lowStock`      |
| `> 5`          | OK                 | `available`     |

If the configured text is an empty string(`""`), no output is rendered.

---

### Configuration Example

```json
{
   "available": "Verfügbar",
   "lowStock": "Niedriger Bestand",
   "unavailable": "Nicht verfügbar"
}
```

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.

## License

Shopgate Connect - Extension Boilerplate is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE) file for more information.
