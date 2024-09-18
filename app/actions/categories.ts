// app/actions/categories.ts
"use server";

import { db } from "@/lib/db";

export async function removeCategory(id: string) {
  try {
    await db.category.delete({
      where: {
        id: id,
      },
    });
    return {
      message: "Delicioso",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      success: false,
    };
  }
}

// In app/actions/categories.ts
// export async function GetCategoryNames() {
//   const categories = await db.category.findMany({});
//   return categories;

// }

export async function GetCategoryNames() {
  try {
    const categories = await db.category.findMany({});
    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// In app/actions/categories.ts
export async function removeCategoryById(categoryId: string) {
  try {
    await db.category.delete({
      where: { id: categoryId },
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

export async function GetSubCategories(categoryId: string) {
  try {
    const subcategories = await db.subCategory.findMany({
      where: {
        categoryId: categoryId,
      },
    });
    return subcategories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function addsubCtegoriesAction(
  name: string,
  categoryname: string
) {
  try {
    let decodedCategoryName = categoryname;

    // Try to decode the category name
    try {
      decodedCategoryName = decodeURIComponent(categoryname);
    } catch (e) {
      console.log("Category name is not URI-encoded.");
    }

    const category = await db.category.findUnique({
      where: {
        name: decodedCategoryName,
      },
    });

    if (!category) {
      return {
        success: false,
        message: `La categoría "${decodedCategoryName}" no existe.`,
      };
    }

    const subcategory = await db.subCategory.create({
      data: {
        name: name,
        categoryId: category.id,
        createdAt: new Date(),
      },
    });

    return {
      success: true,
      name: subcategory.name,
      message: `Subcategoría "${subcategory.name}" añadida con éxito.`,
    };

  } catch (error) {
    console.error("Error al añadir la subcategoría:", error);
    
    let errorMessage = "Error desconocido al añadir la subcategoría.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function removesubCategory(name: string) {
  try {
    //DELETE A SUB CATEGORY FOR THIS CATEGORY
    await db.subCategory.delete({
      where: {
        name: name,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateCategoryImage(
  imageUrl: string,
  categoryname: string
) {
  try {
    await db.category.update({
      where: {
        id: categoryname,
      },
      data: {
        imageUrl: imageUrl,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function GetCategoryItem(categoryId: string) {
  try {
    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    return category;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function GetSubCategoryItem(id: string) {
  try {
    const subcategoryItem = await db.subCategory.findUnique({
      where: {
        id: id,
      },
    });
    return subcategoryItem;
  } catch (error) {
    console.log();
    return null;
  }
}

export async function updateDescription(
  subcategoryId: string,
  description: string
) {
  try {
    await db.subCategory.update({
      where: {
        id: subcategoryId,
      },
      data: {
        description: description,
      },
    });
    return {
      message: "Sub Categoria actualizado",
    };
  } catch (error) {
    console.log(error);
    return {
      message: error,
    };
  }
}

export async function GetCategoryNameFromSubCategory(id: string) {
  try {
    const category = await db.category.findUnique({
      where: {
        id: id,
      },
    });

    return category;
  } catch (error) {
    console.log(error);
    return null;
  }
}
