import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
      private categoriesRepository: ICategoriesRepository
    ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoriesAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoriesAlreadyExists) {
      throw new AppError("Category already exists!");
    }
  
    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };