import { faqs, site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-white">
      <div className="container py-20 lg:py-28">
        <SectionHeading
          eyebrow="Straight answers"
          title="The questions worth asking"
          description="Including the uncomfortable ones. If it affects your decision, it belongs here."
        />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-8 text-center text-sm text-slate-500">
            Still have a question? Call{" "}
            <a
              href={`tel:${site.phone.replace(/[^0-9]/g, "")}`}
              className="font-semibold text-teal-600 hover:underline"
            >
              {site.phone}
            </a>{" "}
            and talk to a real advisor — no script, no pressure.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
