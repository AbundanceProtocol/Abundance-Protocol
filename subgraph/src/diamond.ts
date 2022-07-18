import { BigInt, ipfs, json, log, Bytes } from "@graphprotocol/graph-ts"
import {
  Diamond,
  PostCreated as PostCreatedEvent,
  FundingRequested as FundingRequestedEvent
} from "../generated/Diamond/Diamond"
import { Post, FundingReq } from "../generated/schema"

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
    let authors = new Array<Bytes>(0)
    for (let i = 0; i < postData.value.postAuth.length; i++) {
      authors.push(postData.value.postAuth[i].author)
    }
    post.authors = authors
    let categories = new Array<string>(0)
    for (let i = 0; i < postData.value.postCat.length; i++) {
      categories.push(postData.value.postCat[i].catId)
    }
    post.categories = categories
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

export function handleFundingRequested(event: FundingRequestedEvent): void {
  let contract = Diamond.bind(event.address)
  let userFundingReqsData = contract.try_getAllFundingReqs(event.params.user)
  for (let i = 0; i < userFundingReqsData.value.length; i++) {
    let fundingReqData = FundingReq.load(userFundingReqsData.value[i].reqId.toString())
    if (!fundingReqData) {
      let fundingReq = new FundingReq(userFundingReqsData.value[i].reqId.toString());
      fundingReq.user = event.params.user
      fundingReq.amountRequested = userFundingReqsData.value[i].amountRequested
      fundingReq.returnRate = userFundingReqsData.value[i].returnRate
      fundingReq.deadline = userFundingReqsData.value[i].deadline
      fundingReq.reqType = userFundingReqsData.value[i].reqType
      fundingReq.save()
    }
  }
}