import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <section id="contact" className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-mono font-bold mb-6">Get in touch</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <p className="font-mono font-bold text-foreground mb-1">Corporate Address</p>
                <p>15303 Ventura Blvd, Suite 850, Sherman Oaks, CA 91403, United States</p>
              </div>
              <div>
                <p className="font-mono font-bold text-foreground mb-1">Contacts</p>
                <p className="hover:text-primary font-semibold"><a href="tel:+14073497496">+1 (407) 349-7496</a></p>
                <p className="hover:text-primary"><a href="mailto:acustomer750@gmail.com">acustomer750@gmail.com</a></p>
              </div>
            </div>
          </div>

          <form className="space-y-4">
            <Input placeholder="Your name" className="border-2 hover:border-accent transition-colors" />
            <Input placeholder="Company name" className="border-2 hover:border-accent transition-colors" />
            <Input placeholder="Phone number" type="tel" className="border-2 hover:border-accent transition-colors" />
            <Input placeholder="Email address" type="email" className="border-2 hover:border-accent transition-colors" />
            <Textarea
              placeholder="Anything else you would like us to know?"
              className="border-2 min-h-32 hover:border-accent transition-colors"
            />
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-mono transition-all duration-300 hover:shadow-lg hover:shadow-accent/30">
              Send message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
