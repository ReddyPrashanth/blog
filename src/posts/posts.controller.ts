import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Body, Controller, Delete, Get, HttpCode, InternalServerErrorException, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {

    constructor(private readonly postsService: PostsService) {}

    /**
     * Retrieves posts
     * 
     * @return user posts
     */
    @Get('')
    async getPosts() {
        return await this.postsService.getPosts();
    }

    /**
     * Retrieves a post by id
     * 
     * @param id - post id
     * @return user post
     */
    @Get('/:id')
    getPost(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.getPostById(id);
    }

    /**
     * Creates a post
     * 
     * @param post - new post
     * @return new post
     */
    @Post('')
    createPost(@Body() createPostDto: CreatePostDto) {
        return this.postsService.createPost(createPostDto);
    }

    /**
     * Updates a post
     * 
     * @param post - post dto
     * @param id - post id 
     * @return updated post
     */
    @Put('/:id')
    updatePost(@Body() updatePostDto: UpdatePostDto, @Param('id', ParseIntPipe) id: number) {
        return this.postsService.updatePost(id, updatePostDto);
    }

    /**
     * Delete a post
     * 
     * @param id - post id
     * @return post id
     */
    @Delete('/:id')
    @HttpCode(204)
    deletePost(@Param('id', ParseIntPipe) id: number) {
        this.postsService.deletPost(id);
    }
}
