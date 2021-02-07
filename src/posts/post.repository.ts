import { Post } from './post.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}