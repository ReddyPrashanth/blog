import { User } from 'src/users/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, InternalServerErrorException, Param, ParseIntPipe, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('posts')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {

    constructor(private readonly postsService: PostsService) {}

    /**
     * Retrieves posts
     * 
     * @return user posts
     */
    @Get('')
    async getPosts(@GetUser() user: User) {
        return await this.postsService.getPosts(user);
    }

    /**
     * Retrieves a post by id
     * 
     * @param id - post id
     * @return user post
     */
    @Get('/:id')
    getPost(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
        return this.postsService.getPostById(id, user);
    }

    /**
     * Creates a post
     * 
     * @param post - new post
     * @return new post
     */
    @Post('')
    createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
        return this.postsService.createPost(createPostDto, user);
    }

    /**
     * Updates a post
     * 
     * @param post - post dto
     * @param id - post id 
     * @return updated post
     */
    @Put('/:id')
    updatePost(@Body() updatePostDto: UpdatePostDto, @Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
        return this.postsService.updatePost(id, updatePostDto, user);
    }

    /**
     * Delete a post
     * 
     * @param id - post id
     * @return post id
     */
    @Delete('/:id')
    @HttpCode(204)
    async deletePost(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
        await this.postsService.deletPost(id, user);
    }
}
