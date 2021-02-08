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

    async getPosts(): Promise<Post[]> {
        return await this.postRepository.find();
    }

    async getPostById(id:number) {
        const post = await this.postRepository.findOne(id);
        if(post) {
            return post;
        }
        throw new PostNotFoundException(id);
    }

    async createPost(createPostDto: CreatePostDto) {
        const post = await this.postRepository.create(createPostDto);
        await this.postRepository.save(post);
        return post;
    }

    async updatePost(id: number,updatePostDto: UpdatePostDto) {
        await this.postRepository.update(id, updatePostDto);
        const post = await this.getPostById(id);
        return post;
    }

    async deletPost(id: number) {
        const deleted = await this.postRepository.delete({id});
        if(deleted.affected == 0) {
            throw new PostNotFoundException(id);
        }
    }

}
