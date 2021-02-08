import { User } from 'src/users/user.entity';
import { PostNotFoundException } from './exceptions/post-not-found.exception';
import { PostRepository } from './post.repository';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(PostRepository)
        private postRepository: PostRepository
    ) {}

    async getPosts(user: User): Promise<Post[]> {
        return await this.postRepository.find({where: {authorId: user.id}});
    }

    async getPostById(id:number, user:User) {
        const post = await this.postRepository.findOne({where: {id, userId: user.id}});
        if(post) {
            return post;
        }
        throw new PostNotFoundException(id);
    }

    async createPost(createPostDto: CreatePostDto, user:User) {
        const post = await this.postRepository.create({
            ...createPostDto,
            author: user
        });
        await this.postRepository.save(post);
        return post;
    }

    async updatePost(id: number,updatePostDto: UpdatePostDto, user: User) {
        const post = await this.getPostById(id, user);
        post.title = updatePostDto.title;
        post.content = updatePostDto.content;
        await post.save();
        return post;
    }

    async deletPost(id: number, user: User) {
        const deleted = await this.postRepository.delete({id, authorId: user.id});
        if(deleted.affected == 0) {
            throw new PostNotFoundException(id);
        }
    }

}
