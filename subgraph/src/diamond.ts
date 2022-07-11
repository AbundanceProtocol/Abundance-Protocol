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
    post.initialReview = postData.value.initialReview
    post.challenged = postData.value.challenged
    post.reqExpertise = postData.value.reqExpertise
    post.lockExpiration = postData.value.lockExpiration
    post.CrS = postData.value.CrS
    post.IS = postData.value.IS
    post.postValue = postData.value.postValue
    post.timestamp = postData.value.timestamp
    post.author = postData.value.postAuth[0].author
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