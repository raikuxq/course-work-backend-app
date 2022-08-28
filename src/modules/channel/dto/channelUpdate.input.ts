import { InputType, Field } from '@nestjs/graphql';
import { ChannelCreateInput } from './channelCreateInput';

@InputType()
export class ChannelUpdateInput extends ChannelCreateInput {}
