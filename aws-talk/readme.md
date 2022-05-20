# AWS + Nuxt, Baby steps

## Disclaimer

This a basic tutorial on how to host a Nuxt site using Amazon Web Services, featuring S3, Cloudfront, Amazon Certificate Manager, & Route 53.

The idea is to have a basic understanding on how these services work and communicate with each other, in order to prepare attendants for future talks.

This is the first part of the talk, second part we will be addressing how to achieve the same but using Terraform.

## Services we are going to use

![image](https://user-images.githubusercontent.com/6674841/169093269-d8d17ea7-0521-4f65-a8c2-39151ea2b478.png)

### S3

S3 or Simple Storage Service is an Amazon service that allow us to store objects in a so called bucket.

### Cloudfront

CloudFront is a service that allows to distribute static & dynamic web content across all the globe (such html, and/or images, etc...).

### Route53

Route53 is a service intended for managing DNS for services and machines deployed on Amazon's public cloud.

### Amazon Certificate Manager

AWS Certificate Manager is a service that lets you easily provision, manage, and deploy public and private Secure Sockets Layer/Transport Layer Security (SSL/TLS) certificates for use with AWS services and your internal connected resources.

## How is this tutorial structured

1. We will purchase a domain using Route 53
1. We will create a certificate using Amazon Certificate Manager
1. Then we will validate the domain against ACM
1. We will create a bucket to store the static web content
1. We will create two distributions that will connect all the the things (one of the distributions will only be responsible for redirecting from www to a naked domain)
1. And lastly, we will tackle what is the required configuration for our Nuxt Site

## Domain (Route 53)

First of all, we will need to navigate to the Route 53 service using the search bar.

![image](https://user-images.githubusercontent.com/6674841/169094985-d7343dd9-4e14-497c-aade-1a8272b49dca.png)

In the dashboard, we will go to the Register Domain section, and then check for the domain we want.

![image](https://user-images.githubusercontent.com/6674841/169095444-ec5040b8-a19c-4f89-a39b-0df44b9bcf38.png)

After the purchase, and after some time (because this process can take some minutes), we will be able to see our new domain in the list of domains. Also, automatically a new hosted zone will be created. Then we can enter this hosted zone and see that is giving us some information.

![image](https://user-images.githubusercontent.com/6674841/169095856-9c1ebb92-033c-4b06-bd98-d47dee1b99db.png)

As we can see, there are some records already created for this hosted zone. This means that everything worked as it should.

## Amazon Certificate Manager

We need then to navigate to ACM trough the search bar.

![image](https://user-images.githubusercontent.com/6674841/169096289-d8f9e995-9066-4cfe-a0f2-9153b9b62c5d.png)

In the list of certificates, we need to click now the orange button in order to request a new certificate.

![image](https://user-images.githubusercontent.com/6674841/169096478-2d3bc443-836e-4ce4-a4cb-a34caada400b.png)

We then will request a public certificate, and add two fully qualified domain names. This detail is important in order to create the distributions later on. So one will be with www. and the other one will be the naked version. Also, we will select the DNS validation method.

![image](https://user-images.githubusercontent.com/6674841/169096819-60f62c0a-ecca-4ee4-9dcd-b3bcf2e0a640.png)

![image](https://user-images.githubusercontent.com/6674841/169096764-6cfa6203-ab76-4173-b3fb-057bc573941c.png)

After this, we will see our new certificate, but is still pending for validation.

![image](https://user-images.githubusercontent.com/6674841/169097794-b646881e-3121-41dc-8ace-c3800ce9926e.png)

## Validating the certificate

Now we need to come back into ACM, and then open the details for the certificate we created earlier. In the Domains section, we will see two CNAME records we will need to add into our hosted zone. 

![image](https://user-images.githubusercontent.com/6674841/169098439-c790d572-6409-44d9-ab05-7fc9fa0edbae.png)

Then in Route53 we will only need to add those TWO records to the hosted zone.

![image](https://user-images.githubusercontent.com/6674841/169098508-13f89e5e-3465-4cd1-9bf5-60c716d277d7.png)

![image](https://user-images.githubusercontent.com/6674841/169098682-fc4662c2-deb4-41c6-84c2-8eb52ec48864.png)

Then we will be able to see those new records in the record list.

![image](https://user-images.githubusercontent.com/6674841/169098785-c66783d2-3328-4cce-8932-08acd7fe2d95.png)

It will take a bit of time to propagate and validate so now is a good moment to make a sandwich or check some videillos in YouTube.

Eventually, if we come back to ACM, into the certificate details we created, we will see the success tick in both domains.

![image](https://user-images.githubusercontent.com/6674841/169099048-d5e89477-7676-4fb7-9d86-78b0e9921d89.png)


## S3

Now, again, we will go to S3 through the search bar.

![image](https://user-images.githubusercontent.com/6674841/169099919-49c8b5f4-1f22-41a1-810a-f35bba2c0fbf.png)

In the dashboard, we need to create a new bucket by clicking the orange button.

![image](https://user-images.githubusercontent.com/6674841/169100196-111d8cbf-297f-4112-9661-a27586c6f07a.png)

Now on the creation form, we will need to focus on two places. First of all, at the top, in the General configuration section, we will need to name our bucket and select a region. For the scope of this talk, it does not really matter which region it is, but nonetheless is an important decision we have to make when we need to implement this in a real world scenario.

![image](https://user-images.githubusercontent.com/6674841/169100938-9330c2cb-d1e5-47b0-b159-faf048660e6e.png)

Second thing we need to focus, is the section where says Block Public Access settings for this bucket. We will need to untick ALL of them, and then tick the last tick to acknowledge that we really want to do that.

![image](https://user-images.githubusercontent.com/6674841/169101217-05579e3e-0fb8-4d55-b568-94b598024cb6.png)

Now if we observe, in the list we can see our bucket, but it says that objects can be public. We are no quite done yet!

![image](https://user-images.githubusercontent.com/6674841/169101260-a59c42be-e403-4322-9dee-935f407018ac.png)

Then, next thing is to check in the details of this new bucket we created, on the properties tab, waaaay down below there is a section where it says Static website hosting. We need to click on the edit button.

![image](https://user-images.githubusercontent.com/6674841/169146988-3154ce77-d7c0-4635-9fa6-168e41d5f3b3.png)

Then we will need to specify the index and error documents.

![image](https://user-images.githubusercontent.com/6674841/169147074-3152cb5d-fe94-4b37-ad7b-17575bc883ee.png)

Next, we need to go to the permissions tab (still in the S3 details page) and add a new policy for this bucketi wiggity.

![image](https://user-images.githubusercontent.com/6674841/169147210-d16a1ca7-8145-461e-9157-56e618cb0d2d.png)

Then we will add the following JSON into the big textarea, and then save the changes.

![image](https://user-images.githubusercontent.com/6674841/169147441-011efe5d-17fb-4923-b866-61150d2383e6.png)

Here is the JSON code, for better copypastingment:

```json
{
  "Version": "2012-20-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<YOURBUCKETNAMEHEREFELLOWDEV>/*"
    }
  ]
}
```

Then once saved, we will be able to see a nice red pill saying that is Publicly accesible.

![image](https://user-images.githubusercontent.com/6674841/169148098-900d4f8d-8ca8-4f7c-8758-047dec80e06e.png)

Then now, we are going to make a quick test to check if everything works as we expect. We will upload an image to the bucket. There is the orange button to uploa the file.

![image](https://user-images.githubusercontent.com/6674841/169148234-f852db76-129d-4325-b164-fffa782d3d5a.png)

We select the file we want, and then click on Upload (orange button again yes).

![image](https://user-images.githubusercontent.com/6674841/169148359-98dfe3be-5289-4be7-b28e-23778ffb9b0a.png)

Then we should see a green notification saying we re the best.

![image](https://user-images.githubusercontent.com/6674841/169148477-8ff3c98c-bfb7-4f44-8bad-8136c5a213b2.png)

And now we go back to the S3 bucket details, in the properties tab, all the way down again where the static website hosting section is, and then we will see a url there. Thats the public url of the bucket, so we will copy it like the great copypaste masters we are.

![image](https://user-images.githubusercontent.com/6674841/169148657-c88f9d73-687c-49fa-a506-976f05e4630d.png)

And if we access the url, and we put the name of the file, we should see our magnificent image. Pro tip, if you upload a photo of yourself, it increases the swagginess by at least a 3%.

![image](https://user-images.githubusercontent.com/6674841/169148830-7e84e784-3832-44c9-9f25-b48a6d4e8910.png)

## Cloudfront

We now navigate to CloudFront through the search bar.

![image](https://user-images.githubusercontent.com/6674841/169150141-47d8503f-49f9-4fdb-a43b-65d9ebed26b8.png)

What we are about to do now is to create TWO distributions, one for the real site with the naked domain, and another one for the www that will be used to redirect to the naked one.

In the CF dashboard, we now press (guess what) the orange button where it says Create Distribution.

![image](https://user-images.githubusercontent.com/6674841/169155771-4883df52-14c4-46c4-8e76-8f96d7dfd7a6.png)

As we can see, we have now a form longer that light takes to travel to the next kebap shop 5 million times, but we only need to focus in two places, The Origin domain section and the Alternate domain name section. In the origin domain we will choose our s3 bucket, the name should be autofilled by aws because they re that cool. Then next, we need to add the domain name without www, and then select the certificate we created before. If you remember, the reason we put both domains in the certificate is to allow us to add the domain in the Alternate domain name field with no www.

> Impotant note, probably in the dropdown list when choosing an origin, it wont show the bucket we want. The bucket we want to set as ortigin is the website one, this can be found on the S3 details, where we were checking the image uploaded. If you put that without the https:// it will resolve all the folders to the `index.html` document. If you choose another buchet without the `-website` in the name, the `index.html` resolution wont work at all.

![image](https://user-images.githubusercontent.com/6674841/169156410-1b837241-5d12-4673-9eb9-ec5c97415b29.png)

An important detail is that, if you forget to add a description like it happened to me, we can just edit the details in the distribution details. This is useful to differentiate the distributions by a more readable name.

![image](https://user-images.githubusercontent.com/6674841/169156636-8b7dc2ff-4690-47a4-a76f-e0978a45b67c.png)

Also, we need to go to the Behaviours tab, and edit the current behaviour. We need to change one option to redirect from http to https as we only need the https site.

![image](https://user-images.githubusercontent.com/6674841/169165693-3d4b7fd9-223c-47df-8cc9-867746efb2b7.png)
![image](https://user-images.githubusercontent.com/6674841/169165726-a4148714-3ee1-4385-8a63-fe77cb8cf935.png)


Then for the second distribution, we repeat the same steps as before, but the only difference is the alternate domain name, here we will put the www, and at the end, add in the description a name that will help us differentiate the distributions.

![image](https://user-images.githubusercontent.com/6674841/169156846-4243c45d-ab60-452f-aa27-50b3e577a89d.png)

For this second distribution we created, we will need to add a function. You can find the access on the left side when looking at the distribution details.

![image](https://user-images.githubusercontent.com/6674841/169157100-9cf42df3-bf13-4f55-8d56-278898f977b6.png)

We will name the function now.

![image](https://user-images.githubusercontent.com/6674841/169157172-ae40c6a0-98c4-440b-9e9f-36dd10cc71bd.png)

And then we will add the following code in order to redirect all the requests to the naked version. 

![image](https://user-images.githubusercontent.com/6674841/169157242-cbb777a6-ca93-4de5-b515-c4c6fb150c58.png)

Here is the code for better copypasta.

```js
function handler(event) {
  var response = {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: {
        location: { value: `https://theartofuseless.com${event.request.uri}` }
    }
  };
  return response;
}
```

> Please note that here we are ignoring the qs, as for this case we dont really care as we dont use em in the site. But have in mind you would have to add id in case you need it.

Later, after saving the code, we need to publish the function. This is important to avoid eternal pain and suffering, wondering if your career choices were the correct ones while asking yourself why you cannot use it in your distribution.

![image](https://user-images.githubusercontent.com/6674841/169157582-8fc4974b-b8fd-47d2-bbe2-0ab782c65f8f.png)

Once we created the function, we now need to add a behaviour to the distribution.

![image](https://user-images.githubusercontent.com/6674841/169157818-b38f33cc-60b8-465b-817d-adf3f77cdc41.png)

Yes, it was the orange button again. This joke is getting old already...

Then when creating the behaviour, we need to focus on two places, first on the Path pattern, we add the `*`, because we want it everywhere, and in the origin groups we just select our bucket. And then in the function association, we just say we want to use our function on a viewer request.

![image](https://user-images.githubusercontent.com/6674841/169171492-02cc724f-be23-4198-bd9a-f4e4f4b5965c.png)


## TESTING THE STUFF

So we are basically done, now we only need to test if we can see our image by accessing through the domain name.

![image](https://user-images.githubusercontent.com/6674841/169158352-42e21bcc-d584-4e64-bd27-0a5e658ea553.png)

And also, https ;).

## Nuxt configuration

For nuxt site we will only need this config.

```js
export default {
    target: 'static',

    generate: {
        fallback: '404.html',
    },
    
    // your stuff...
};
```

## Uploading the nuxt page

For this, we will only need to upload the `dist/` folder when we run the `generate` command, and you should be able to see your website.

Also note that, probably you will need to invalidate cache everytime new content is uploaded to S3. This can be done in your distributions, in the invalidations tab, you will need to create an invalidation, and just add `/*` into the textarea. This is not really a good practise if your site is a big one, as this has a cost that can be something to consider in a real world scenario. For a small web its just fine.

![image](https://user-images.githubusercontent.com/6674841/169158849-18d6a4ed-2284-4e1d-93fe-3c6a8a12de9d.png)
![image](https://user-images.githubusercontent.com/6674841/169158898-e0781b16-64e8-45e9-ba5f-068d80c834e6.png)

After doing this, cloudfront will take some minutes to propagate all the changes and you would be able to see the changes.

## Links

If you want to check the website created for this, please visit https://theartofuseless.com
If you want to follow our community, follow us in twitter https://mobile.twitter.com/vuejsbcn
