import { BigInt, ipfs, json, log } from "@graphprotocol/graph-ts"
import {
  Diamond,
  PostCreated as PostCreatedEvent,
} from "../generated/Diamond/Diamond"
import { Post } from "../generated/schema"

export function handlePostCreated(event: PostCreatedEvent): void {
  let post = new Post(event.params.id.toString());
  post.contentHash = event.params.hash;
  let contract = Diamond.bind(event.address)
  let postData = contract.try_fetchPost(event.params.hash)
  if (postData.reverted) {
    log.info('fetchPost reverted', [])
  } else {
    let postValues = postData.value
    // log.info(postValues.toString(), [])
    // if (postValues) {
      // post.CrS = postValues.value2
    // }
  }
  let data = ipfs.cat(event.params.hash);
  if (data) {
    let value = json.fromBytes(data).toObject()
    if (value) {
      const content = value.get('content')
      const title = value.get('title')
      if (content) {
        post.postContent = content.toString()
      } else {
          log.info(data.toString(), [])
      }
      if (title) {
        post.title = title.toString()
      }
    }
  }
  post.save()
}