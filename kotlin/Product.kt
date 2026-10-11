data class Product(
    val id: Int,
    val name: String,
    val price: Double,
    val category: String,
    val stock: Int?
)

fun stockLabel(stock: Int?): String {
    if (stock == null) {
        return "Sin dato"
    }

    return when {
        stock == 0 -> "Agotado"
        stock < 5 -> "Pocas unidades"
        else -> "Disponible"
    }
}

fun applyDiscount(price: Double, percent: Int): Double {
    return price * (1 - percent / 100.0)
}

fun main() {
    val products = listOf(
        Product(1, "Agua mineral", 1800.0, "Bebidas", 120),
        Product(2, "Producto sin inventario conocido", 5000.0, "Hogar", null),
        Product(3, "Galletas de avena", 2700.0, "Snacks", 0)
    )

    for (product in products) {
        val discountedPrice = applyDiscount(product.price, 10)

        println(
            "Nombre: ${product.name} | " +
                "Stock: ${stockLabel(product.stock)} | " +
                "Precio con 10% de descuento: $discountedPrice"
        )
    }
}