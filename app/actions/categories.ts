"use server";

import { auth } from "@/firebase";
import { db } from "@/lib/db";

export async function addCtegoriesAction(name: string) {
  const user = auth.currentUser;
  const userId = user?.uid;

  if (!userId) {
    throw new Error("User not found.");
  }

  const samecategory = await db.category.findFirst({
    where: { name: name },
  });

  if (samecategory) {
    return {
      message: "La categoría existe!",
      success: false,
    };
  }

  await db.category.create({
    data: {
      name: name
    },
  });

  return {
    message: "Categoría creada con éxito",
    success: true,
  };
}

export async function removeCategory(name: string) {
  try {
    await db.category.delete({
      where: {
        name: name,
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

export async function GetCategoryNames() {
  try {
    const categories = await db.category.findMany({});
    return categories;
  } catch (error) {
    console.log(error);
    return [];
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
      // If decoding fails, assume it's not URI-encoded and use the original value
      console.log("Category name is not URI-encoded.");
    }

    //CREATE A SUB CATEGORY FOR THIS CATEGORY
    console.log("sub-name->", name);
    console.log("category->", decodedCategoryName);

    const category = await db.category.findUnique({
      where: {
        name: decodedCategoryName,
      },
    });
    if (category) {
      const subcategory = await db.subCategory.create({
        data: {
          name: name,
          categoryId: category.id,
          createdAt: new Date(),
        },
      });
      return subcategory;
    }
  } catch (error) {
    console.log(error);
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
