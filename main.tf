# INTENTIONALLY INSECURE - FOR SCANNER TESTING ONLY. Never apply this.
provider "aws" {
  region = "us-east-1"
}

# MISCONFIG: S3 bucket with public-read ACL, no encryption, no versioning
resource "aws_s3_bucket" "data" {
  bucket = "demo-vulnerable-bucket"
  acl    = "public-read"
}

# MISCONFIG: Security group open to the world on all ports
resource "aws_security_group" "open" {
  name        = "allow_all"
  description = "Allow all traffic"

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# MISCONFIG: Kubernetes pod with privileged container and hostPath volume
resource "kubernetes_pod" "bad" {
  metadata {
    name = "bad-pod"
  }
  spec {
    container {
      name  = "app"
      image = "node:12"
      security_context {
        privileged = true
      }
      volume_mount {
        name       = "host"
        mount_path = "/host"
      }
    }
    volume {
      name = "host"
      host_path {
        path = "/"
      }
    }
  }
}
