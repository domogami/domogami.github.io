---
title: AWS Cloud Development Kit (CDK)
---

# CDK is Weird

I have been working with CDK quite a bit now and there are numerous issues that have caused me hours of pain but after it all I feel like it is a wonderful tool and provides some incredible benefits. Some bugs are fundamental issues with how CDK works by converting TypeScript into CloudFormation Templates and others are just AWS specific oddities.

## How I Learned CDK

I did a wild thing in 2024. I told my new manager that I did not have a strong understanding of infrastructure, pipelines, and CDK. During our team's offsite in New York, I decided to volunteer to setup the infrastructure for our team despite not knowing much about it so that I was put outside of my comfort zone. With the pressure to setup things so that other teammates could build off of it, I spent a lot of late nights learning about CDK and making many mistakes. I feel so much more comfortable working with CDK now and I feel much better than I did before.

# Weird Dependency Things

There is an [Open Issue with the AWS CDK Lib](https://github.com/aws/aws-cdk/issues/34290) that has caused me many headaches. One way to prevent some issues with resources being created in an unintended order is to specifically add manual dependencies with the `.node.addDependency()` function as shown below.

````ts {11}
private attachToELBv2(targetGroup: elbv2.ITargetGroup, containerName: string, containerPort: number): elbv2.LoadBalancerTargetProps {
  // ...
  this.loadBalancers.push({
    targetGroupArn: targetGroup.targetGroupArn,
    containerName,
    containerPort,
  });

  // Service creation can only happen after the load balancer has
  // been associated with our target group(s), so add ordering dependency.
    this.resource.node.addDependency(targetGroup.loadBalancerAttached);
  
  // ...
}
````

## What I've Learned Working with CDK

I've learned that sometimes CDK is a matter of trial and error and just because it compiles doesn't mean that the CloudFormation (CFN) YAML/JSON file will have resources defined in the correct order and you may need to manually inspect the CFN output or add manual dependencies. I've also needed to delete everything, redeploy, then do incremental deployments to ensure resources are created in the order that I need them to be. This is especially important when declaring one resource with IAM permissions that haven't been created yet. Hopefully CDK will continue to improve in this respect and it will become less of an issue.
