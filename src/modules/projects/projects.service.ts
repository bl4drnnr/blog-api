import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from '@models/project.model';
import { CreateProjectRequest } from '@projects/dto/create-project/request.dto';
import { UpdateProjectRequest } from '@projects/dto/update-project/request.dto';
import sequelize, { Op } from 'sequelize';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project
  ) {}

  async getProjectBySlug({
    slug,
    language
  }: {
    slug: string;
    language: string;
  }) {
    return await this.projectRepository.findOne({
      where: { slug, language }
    });
  }

  async getProjectById({ id }: { id: string }) {
    return await this.projectRepository.findByPk(id);
  }

  async getAllProjects({
    language,
    page,
    pageSize,
    order,
    orderBy,
    searchQuery
  }: {
    language: string;
    page: number;
    pageSize: number;
    order: string;
    orderBy: string;
    searchQuery: string;
  }) {
    const offset = page * pageSize;
    const limit = pageSize;

    if (!['DESC', 'ASC'].includes(orderBy)) throw new BadRequestException();

    if (!['created_at', 'title'].includes(order))
      throw new BadRequestException();

    const where = searchQuery
      ? {
          language,
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${searchQuery}%`
              }
            },
            sequelize.where(
              sequelize.fn(
                'array_to_string',
                sequelize.col('search_tags'),
                ','
              ),
              'ILIKE',
              `%${searchQuery}%`
            )
          ]
        }
      : { language };

    return await this.projectRepository.findAndCountAll({
      where: { ...where },
      order: [[order, orderBy]],
      limit,
      offset
    });
  }

  async createProject({ project }: { project: CreateProjectRequest }) {
    return await this.projectRepository.create(project);
  }

  async updateProject({
    id,
    project
  }: {
    id: string;
    project: UpdateProjectRequest;
  }) {
    return await this.projectRepository.update(
      {
        ...project
      },
      { where: { id } }
    );
  }

  async deleteProject({ id }: { id: string }) {
    return await this.projectRepository.destroy({ where: { id } });
  }
}
